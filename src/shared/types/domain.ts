import type { UserRole } from "@/constants/roles";

export type ID = string;

export interface BaseRecord {
  id: ID;
  createdAt: number;
  updatedAt: number;
}

export interface UserRecord extends BaseRecord {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phoneNumber?: string;
  status: "active" | "suspended";
}

export interface AccessItemRecord extends BaseRecord {
  name: string;
  description: string;
  order: number;
  isReusable: boolean;
}

export interface TicketVariantRecord extends BaseRecord {
  eventId: ID;
  name: string;
  description: string;
  price: number;
  availableQuantity: number;
  salesStartAt: number;
  salesEndAt: number;
  accessItemIds: ID[];
  status: "draft" | "published" | "archived";
}

export interface EventRecord extends BaseRecord {
  organizerId: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  bannerUrl?: string;
  startsAt: number;
  endsAt: number;
  capacity: number;
  status: "draft" | "published" | "archived";
}

export interface ReservationRecord extends BaseRecord {
  customerId: string;
  eventId: ID;
  variantId: ID;
  quantity: number;
  paymentProofUrl: string;
  note?: string;
  status: "pending" | "approved" | "rejected";
}

export interface PaymentRecord extends BaseRecord {
  reservationId: ID;
  customerId: string;
  eventId: ID;
  amount: number;
  method: "cash" | "bank-transfer" | "offline";
  proofUrl: string;
  verifiedBy?: string;
  verifiedAt?: number;
  status: "pending" | "verified" | "rejected";
}

export interface QrTokenRecord extends BaseRecord {
  ticketId: ID;
  tokenHash: string;
  expiresAt: number;
  revokedAt?: number;
}

export interface TicketRecord extends BaseRecord {
  reservationId: ID;
  customerId: string;
  eventId: ID;
  variantId: ID;
  ticketNumber: string;
  qrTokenHash: string;
  status: "active" | "revoked" | "used";
}

export interface TicketUsageRecord extends BaseRecord {
  ticketId: ID;
  accessItemId: ID;
  staffId: string;
  staffRole: UserRole;
  scannerDevice: string;
  browser: string;
  ipAddress: string;
  consumedAt: number;
}

export interface AuditLogRecord extends BaseRecord {
  actorId: string;
  actorRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, unknown>;
}