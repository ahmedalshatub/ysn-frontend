# CLAUDE.md — how to work in this template

**Read this before adding a feature.** It is the *how*: the conventions that keep
this codebase and the RAS dashboard (`RASPM`) structurally interchangeable. A
project generated from this template should be navigable by anyone who knows
RASPM, and vice versa.

**Reference implementation:** [`app/src/features/categoriesExample`](app/src/features/categoriesExample)
— a full CRUD feature in three list variants (modal, drawer, form page) on one
API slice. When in doubt, open it and mirror it. In RASPM the equivalent is
`src/features/cities`.

---

## Structure

```
app/src/
├── App.tsx  main.tsx
├── app/                 the store and the single RTK Query API
│   ├── api/instanceApi.ts
│   └── store.ts
├── assets/              css, icons, images, scss   (never moves)
├── core/                the app shell - not a feature
│   ├── config/Menu.tsx
│   ├── i18n/            index.ts, languages.ts, locales/
│   ├── layout/          layouts, navbars/, sidebars/
│   ├── routes/          AllRoutes.tsx, index.tsx
│   └── slices/          theme.slice.ts, layout.slice.ts
├── features/<feature>/  one folder per domain
│   ├── api/             <Entity>.api.ts
│   ├── components/      what its pages render
│   ├── hooks/           only if the feature needs its own
│   ├── pages/           anything reachable as a route
│   ├── services/        only if the feature needs its own
│   ├── slices/          <Entity>.slice.ts, if it has local state
│   ├── types/           <Entity>.types.ts
│   └── validation/      <Entity>.validation.ts
└── shared/              used by 2+ features
    ├── components/  hooks/  services/  types/  utils/
```

### Where things go

| You are adding… | It goes in |
|---|---|
| a screen at a route | `features/<feature>/pages/` |
| something a screen renders (modal, drawer, tab, card, step) | `features/<feature>/components/` |
| RTK Query endpoints | `features/<feature>/api/<Entity>.api.ts` (+ a tag in `app/api/instanceApi.ts`) |
| a DTO / request shape / seed data | `features/<feature>/types/<Entity>.types.ts` |
| a yup schema | `features/<feature>/validation/<Entity>.validation.ts` |
| redux state for one feature | `features/<feature>/slices/<Entity>.slice.ts` |
| a UI primitive used by 2+ features | `shared/components/<category>/` |
| a hook or util used by 2+ features | `shared/hooks/` or `shared/utils/` |
| a sidebar entry | `core/config/Menu.tsx` |
| a route | `core/routes/index.tsx` |
| app-wide state (theme, layout) | `core/slices/` |

If a change needs a file outside the feature folder plus those four
registration points, that is the signal it belongs in `shared/` or `core/`.

### Naming

| Thing | Pattern |
|---|---|
| Feature folder | `camelCase`, plural for collections — `users`, `auditLogs` |
| API slice | `<Entity>.api.ts` |
| Types | `<Entity>.types.ts` |
| Validation | `<Entity>.validation.ts` |
| Feature slice | `<Entity>.slice.ts` |
| Core slice | `<name>.slice.ts` (lowercase) |
| Page | `<Entity>Page.tsx` |
| Feature component | `<Entity>Modal.tsx`, `Delete<Entity>Alert.tsx` |
| Multi-entity feature | `pages/<entity>/…` **and** `components/<entity>/…` |

**Imports are relative.** There is no `@/` alias, deliberately — RASPM has none,
and an alias declared in the wrong tsconfig with no matching vite
`resolve.alias` is worse than no alias at all. `../../../shared/components/...`
is the house style.

---

## The 10 golden rules

### 1. Always use the shared component library — never rebuild
`shared/components/**` already has every button, input, table, modal, card,
chart, drawer and breadcrumb. **Never hand-roll one.**

- Tables → `shared/components/table/DataTable` (+ `TableActionDropdown` / `TableActionButtons`, `TreeTable` for trees)
- Forms → `shared/components/inputs/Form*` (RHF-bound)
- Modals → `shared/components/modals/{Modal, FormModal, AlertModal}`
- Page header → `shared/components/navigation/PageBreadcrumb`
- List filters → `shared/components/navigation/{FilterAccordion, FilterDrawer, FilterDynamic}`
- Feedback → `shared/components/feedback/Toast` (imperative `showSuccess`/`showError`) + `Message` (inline alert)
- Wizards → `shared/components/navigation/Stepper`; graphs → `display/OrgChart`, `navigation/TreeView`, `@xyflow/react`

A genuinely new primitive goes in `shared/`, not inside a feature.

### 2. Exceptions and messages are handled one way
Every mutation/query uses `.unwrap()` inside `try/catch`. **Success →
`showSuccess(t("<feature>.<action>Success"))`. Failure →
`showError(getErrorMessage(error))`.** Never show a raw error object or an
untranslated string.

```ts
import { showSuccess, showError } from "../../../shared/components/feedback/Toast";
import { getErrorMessage } from "../../../shared/utils/errorHandler";

try {
  await updateCategory({ id, data }).unwrap();
  showSuccess(t("categories.updateSuccess"));
  onClose();
} catch (error) {
  showError(getErrorMessage(error));
}
```

### 3. Backend error keys must be translated
The backend returns a dotted key (`Categories.DuplicateName`,
`Auth.InvalidCredentials`) in `error.data.Message`. `getErrorMessage()` looks it
up under the i18n `errors.` namespace and falls back to the raw key.

Every key a feature can trigger **must** exist under `errors.<Domain>.<Code>` in
**every** locale file under `core/i18n/locales/`. A raw key reaching the screen
is a bug, not an acceptable fallback.

### 4. Every GET uses `refetchOnMountOrArgChange: true`
Set it as the hook-options arg **at the call site**, not on the endpoint. Lists,
single items and dropdowns alike.

```ts
const { data, isLoading } = useGetCategoriesQuery(
  { ...filterValues, name: filterValues.name || undefined },
  { refetchOnMountOrArgChange: true }
);
```

### 5. Dropdowns do not send pagination
There is **one** paginated list endpoint per entity, reused for the table and
for dropdowns. Table → the full filter/sort/pagination object. Dropdown → the
*same* hook with `{}` (or only a scoping filter), so the backend returns its
default set. Never add a separate "dropdown" endpoint.

### 6. Selects take data directly via `valueKey`/`labelKey`
`FormSelect` and `Select` accept `options` plus **`valueKey`** / **`labelKey`**
(field names). Pass the raw query array — no `.map`.

```tsx
<FormSelect
  name="parentId" control={control} label={`${t("categories.parent")} *`}
  options={parentsData?.items || []} valueKey="id" labelKey="name" searchable
  error={!!errors.parentId?.message}
  errorMessage={errors.parentId?.message ? t(errors.parentId.message) : ""}
/>
```

Map to `{ id, name }` only when the label is composed from several fields,
filtered, or is itself a translation key (or use `translateOptions`). The props
are `valueKey`/`labelKey` — not `valueName`/`labelName`, not
`optionValue`/`optionLabel`. There is no render prop.

### 7. Validation is yup, mirrors the backend, and runs on blur
One schema file per entity, co-located:
`features/<feature>/validation/<Entity>.validation.ts`. Export `add<X>Schema` /
`update<X>Schema` (alias when identical) and the inferred
`yup.InferType<typeof schema>`. Every message is an i18n key under
`errors.<Module>.*`, resolved with `t()` at render. Forms use `mode: "onBlur"`.

> The shipped examples define their schemas inline in the component. That is the
> old shape — **new features use a `validation/` file.** Moving an example's
> schema out is a welcome, self-contained cleanup.

`Form*` inputs do **not** read RHF errors automatically — pass them:

```tsx
<FormInput
  control={control} name="name" label={t("categories.name")}
  error={!!errors.name?.message}
  errorMessage={errors.name?.message ? t(errors.name.message) : ""}
/>
```

### 8. Files go as `multipart/form-data`, inline
An endpoint that creates or updates a record with a file takes the file itself
in the request — you never send a file id, and there is no standalone upload
endpoint. On update, **omitting the file field keeps the stored file**; sending
one replaces it, so edit screens need a "leave empty to keep" hint.

Build the `FormData` in the feature's `*.types.ts` as an `xToFormData(dto)`
helper and set it as the mutation `body` — never set `Content-Type` yourself.
Scalars as flat keys; nested collections flattened as `collection[index].field`.
`FormFileUpload` holds `File[]`, so map `data.x?.[0]` on submit.

### 9. Repeated tables and views become one prop-driven component
If a table, list, form section, card grid or detail view appears in more than
one place, extract it — never copy-paste. `DataTable` is already generic; column
arrays are `useMemo`'d and parameterised (e.g. a `hideColumns` prop) so one
table serves several contexts.

### 10. No inline styles — SCSS only, registered in `app.scss`
- **No `style={{ … }}`.** Tailwind utilities for layout, design-token classes
  (`ce-*`, `card-*`) for component styling.
- **No `.scss` is ever imported from a `.tsx`.** Add a partial at
  `src/assets/scss/{components|layout|pages}/_<name>.scss` and **one**
  `@import "<section>/<name>";` line to `src/assets/scss/app.scss`.
- Most CRUD pages need no custom SCSS at all.

---

## Adding a feature

```
app/src/features/invoices/
├── api/Invoices.api.ts                  instanceApi.injectEndpoints
├── types/Invoices.types.ts              DTOs; extends BaseListRequest / PaginatedResponse
├── validation/Invoices.validation.ts    yup; messages are errors.* keys
├── components/
│   ├── InvoiceModal.tsx                 wraps FormModal, holds the RHF form
│   └── DeleteInvoiceAlert.tsx           AlertModal type="delete"
└── pages/InvoicesPage.tsx               PageBreadcrumb -> Card(FilterAccordion) -> Card(DataTable)
```

**The API slice.** Endpoints are `getX` (detail), `getXs` (paginated
`PaginatedResponse<T>`), `addX`, `updateX` (signature `{ id, data }`), `deleteX`.
List `providesTags` = per-row `{type, id}` + `{type, id: "LIST"}`; mutations
invalidate the row id + `"LIST"`.

**The page.** Local `filterValues` state seeded
`{ pageSize: 25, pageNumber: 1, sortBy: "Id", isAscending: false, …filters }`.
Empty-string filters become `undefined` before querying. `DataTable` is
server-controlled (`currentPage`/`pageSize`/`totalItems`/`onPageChange`/
`onPageSizeChange`/`sortColumn`/`sortDirection`/`onSort`). Row actions via
`TableActionDropdown`. Dialog state as one object plus `selectedId`/`selectedRow`,
modals conditionally mounted.

**Then register it — four files, nothing else:**

1. `core/routes/index.tsx` — lazy import + an `allAdminRoutes` entry with `allowedRoles`
2. `core/config/Menu.tsx` — sidebar entry with matching `allowedRoles`
3. `core/i18n/locales/*.ts` — the `invoices.*` block and every `errors.Invoice.*` key, in **every** locale
4. `app/api/instanceApi.ts` — add `"Invoices"` to `tagTypes`, or the tags will not type-check

**Verify:** `cd app && npx tsc -b tsconfig.json --noEmit` clean, then click
through list → filter → create → edit → delete for each role that can reach it.

---

## Shared-component prop gotchas

- **`Form*` inputs are `Controller`-based:** pass `control` + `name`, never
  `register`. They do not auto-read errors — pass `error` + `errorMessage`.
  Exceptions: `FormFileUpload` reads its own error; `FormDatePicker` is **not**
  RHF-wired (control it with `value`/`onChange`; its `error` prop is a *string*)
  — wrap it in a `<Controller>` when it must be in the form.
- **Disabled prop naming is inconsistent:** most `Form*` inputs use
  `disabledStatus`; `FormDatePicker`, `FormFileUpload`, `Button` and plain
  `Select` use `disabled`.
- **`FormModal`:** pass `onSubmit={handleSubmit(onValid)}`, fields as `children`,
  drive the button with `loading`.
- **`Toast` is imperative and does not translate:** `showSuccess`/`showError`
  take an already-resolved string — pass `t(...)` or `getErrorMessage(err)`.
  `Message` is a different thing: an inline alert component.
- **`DataTable`:** no built-in actions column — render actions inside a column's
  `render`. `rowKey` is required. Server mode = `onPageChange` + `totalItems`;
  client mode = `clientSidePagination`/`clientSideSorting`.
- **Roles** are a `const` object plus a derived union (`UserRole` in
  `features/auth/types/Roles.types.ts`), never a TS `enum`.

---

## Things specific to this template

### The setup scripts

Run from the repo root, or via `npm run <name>` from `app/`. **Each deletes
files — commit first.** All support `--dry-run` or `--yes`.

| Script | What it does | When |
|---|---|---|
| `npm run rename` | app name, logos, favicons | first, once |
| `npm run layout-setup` | pick orientation + sidebar variant, delete the other 20 | once |
| `npm run auth-setup` | pick one auth design, keep the flows you need, delete the other ~88 screens | once |
| `npm run remove-examples` | delete demo features you do not want | as you go |
| `npm run add-language` | add a locale, pre-filled from an existing one | any time |

They edit `core/routes/index.tsx`, `core/config/Menu.tsx`, `core/i18n/**`,
`core/layout/**` and `app.scss` by pattern. **If you restructure those files,
re-check the scripts** — their path constants sit at the top of each `.mjs`, and
`remove-examples` also matches the `"../../features/…"` shape of a route's lazy
import.

### i18n is auto-discovered
`core/i18n/index.ts` globs `core/i18n/locales/*.ts` at build time and reads
`core/i18n/languages.ts` for the language registry, direction and default. **To
add a language, run `npm run add-language`** — never hand-edit `index.ts`. RTL
is driven by the `dir` field in `languages.ts`.

### SignalR
`shared/services/signalRService.ts` + `shared/hooks/useSignalR.ts`, gated by
`VITE_ENABLE_SIGNALR`. It feeds `features/notifications`. (RASPM uses Firebase
in the same two slots.)

### Layout variants
`core/layout/` ships 21 sidebars and 8 navbars. `npm run layout-setup` keeps one
of each. Per-variant guides are in [`app/docs/sidebar-variants/`](app/docs/sidebar-variants).

### Session boundary
`app/store.ts` resets the whole RTK Query cache on `login` and `logout`, so one
user's cached rows can never surface under the next user's token. Keep it when
you touch the store.

---

## Deliberate differences from RASPM

| Difference | Why |
|---|---|
| `features/profile/` | The template's profile is 4 files across 2 APIs; RASPM's is a single file under `auth`. |
| `shared/services/signalRService.ts` | Same slot as RASPM's `firebaseService.ts`, different transport. |
| `core/i18n` auto-discovery | Strictly better than a hand-listed resources map, and `add-language` depends on it. Worth back-porting to RASPM. |
| 21 sidebars + 8 navbars kept | That is the template's product. RASPM has already picked one. |
| No `core/config/permissions.ts` | RASPM's per-action CRUD permission map is domain-specific. Here, role checks live on routes and menu entries. Add the file when a project needs it. |
| `BaseDto.id` is `number` | RASPM's backend uses GUID strings. `shared/types/Base.types.ts` adds the RASPM-named aliases without changing the id type; a project on a GUID backend edits `shared/types/base.ts`. |
| Core slices are lowercase (`theme.slice.ts`) while `Auth.slice.ts` is not | Inherited from RASPM verbatim so the two repos match. Normalise both repos together, or not at all. |
