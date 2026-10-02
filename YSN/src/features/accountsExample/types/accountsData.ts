import accountsJson from './accounts.json';

export type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
export type AccountNature = 'debit' | 'credit';

export interface Account extends Record<string, unknown> {
  id: string;
  code: string;
  name: string;
  nameAr: string;
  type: AccountType;
  nature: AccountNature;
  level: number;
  isDeleted: boolean;
  balance: number;
  currency: string;
  createdBy: number;
  creator: string;
  createdAt: string;
  children?: Account[];
}

export interface AccountInput {
  code: string;
  name: string;
  nameAr: string;
  type: AccountType;
  nature: AccountNature;
  balance: number;
  currency: string;
}

export interface AccountFilter {
  name: string;
  code: string;
  type: AccountType | '';
  nature: AccountNature | '';
  isDeleted?: boolean;
  createdBy?: number;
}

export const ACCOUNT_TYPES: AccountType[] = [
  'asset',
  'liability',
  'equity',
  'revenue',
  'expense',
];

export const ACCOUNT_NATURES: AccountNature[] = ['debit', 'credit'];

export const defaultNature = (type: AccountType): AccountNature =>
  type === 'asset' || type === 'expense' ? 'debit' : 'credit';

export const seedAccounts = accountsJson as Account[];

export const flattenAccounts = (nodes: Account[]): Account[] =>
  nodes.flatMap((node) => [node, ...flattenAccounts(node.children ?? [])]);

export const isLeaf = (account: Account) => !account.children?.length;

export const findAccount = (nodes: Account[], id: string): Account | undefined =>
  flattenAccounts(nodes).find((node) => node.id === id);

export const getAncestors = (nodes: Account[], id: string): Account[] => {
  const walk = (items: Account[], trail: Account[]): Account[] | undefined => {
    for (const item of items) {
      if (item.id === id) return trail;
      const found = walk(item.children ?? [], [...trail, item]);
      if (found) return found;
    }
    return undefined;
  };
  return walk(nodes, []) ?? [];
};

const mapNode = (
  nodes: Account[],
  id: string,
  updater: (node: Account) => Account
): Account[] => {
  let changed = false;

  const next = nodes.map((node) => {
    if (node.id === id) {
      changed = true;
      return updater(node);
    }
    if (!node.children?.length) return node;

    const children = mapNode(node.children, id, updater);
    if (children === node.children) return node;

    changed = true;
    return { ...node, children };
  });

  return changed ? next : nodes;
};

const nextId = (parent: Account | null, roots: Account[]): string => {
  const siblings = parent ? parent.children ?? [] : roots;
  const used = new Set(siblings.map((sibling) => sibling.id));
  const prefix = parent ? `${parent.id}-` : '';
  let n = siblings.length + 1;
  while (used.has(`${prefix}${n}`)) n += 1;
  return `${prefix}${n}`;
};

export const addAccount = (
  nodes: Account[],
  parentId: string | null,
  input: AccountInput,
  createdBy: number,
  creator: string
): Account[] => {
  const parent = (parentId ? findAccount(nodes, parentId) : null) ?? null;
  const account: Account = {
    ...input,
    id: nextId(parent, nodes),
    level: parent ? parent.level + 1 : 1,
    isDeleted: false,
    createdBy,
    creator,
    createdAt: new Date().toISOString(),
  };

  if (!parent) return [...nodes, account];
  return mapNode(nodes, parent.id, (node) => ({
    ...node,
    children: [...(node.children ?? []), account],
  }));
};

export const updateAccount = (
  nodes: Account[],
  id: string,
  input: AccountInput
): Account[] => mapNode(nodes, id, (node) => ({ ...node, ...input }));

export const setAccountDeleted = (
  nodes: Account[],
  id: string,
  isDeleted: boolean
): Account[] => mapNode(nodes, id, (node) => ({ ...node, isDeleted }));

export const filterAccounts = (nodes: Account[], filter: AccountFilter): Account[] => {
  const name = filter.name.trim().toLowerCase();
  const code = filter.code.trim().toLowerCase();

  const matches = (account: Account) => {
    if (name && ![account.name, account.nameAr].some((value) =>
      value.toLowerCase().includes(name))) return false;
    if (code && !account.code.toLowerCase().includes(code)) return false;
    if (filter.type && account.type !== filter.type) return false;
    if (filter.nature && account.nature !== filter.nature) return false;
    if (filter.isDeleted !== undefined && account.isDeleted !== filter.isDeleted) return false;
    if (filter.createdBy !== undefined && account.createdBy !== filter.createdBy) return false;
    return true;
  };

  const walk = (items: Account[]): Account[] =>
    items.reduce<Account[]>((kept, item) => {
      const children = walk(item.children ?? []);
      if (matches(item) || children.length > 0) {
        const node: Account = { ...item };
        if (children.length > 0) node.children = children;
        else delete node.children;
        kept.push(node);
      }
      return kept;
    }, []);

  return walk(nodes);
};

export const getPostableIds = (nodes: Account[]): Set<string> =>
  new Set(flattenAccounts(nodes).filter(isLeaf).map((account) => account.id));
