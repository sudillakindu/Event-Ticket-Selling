export const USER_ROLES = ["super-admin", "organizer", "scanner-staff", "customer"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const ROLE_LABELS: Record<UserRole, string> = {
  "super-admin": "Super Admin",
  organizer: "Organizer",
  "scanner-staff": "Scanner Staff",
  customer: "Customer"
};

export const ROLE_DASHBOARD_PATHS: Record<UserRole, string> = {
  "super-admin": "/dashboard/admin",
  organizer: "/dashboard/organizer",
  "scanner-staff": "/dashboard/scanner",
  customer: "/dashboard/customer"
};