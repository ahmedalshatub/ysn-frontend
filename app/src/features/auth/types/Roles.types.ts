export const UserRole = {
  SuperAdmin: 1,
  Admin: 2,
  User: 3,
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];
