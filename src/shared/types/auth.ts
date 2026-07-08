import type { UserRole } from "@/constants/roles";

export interface SessionUser {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthContextValue {
  user: SessionUser | null;
  loading: boolean;
}