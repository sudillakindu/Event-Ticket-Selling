import { COLLECTIONS } from "@/constants/collections";
import { adminDb } from "@/lib/firebase/admin";
import { BaseRepository } from "@/repositories/base.repository";
import type { ReservationRecord } from "@/shared/types/domain";

export class ReservationRepository extends BaseRepository<ReservationRecord> {
  protected collectionPath = COLLECTIONS.reservations;

  async save(record: ReservationRecord): Promise<void> {
    await this.ref(record.id).set(record);
  }

  async listByCustomer(customerId: string): Promise<ReservationRecord[]> {
    const snapshot = await adminDb.ref(this.collectionPath).orderByChild("customerId").equalTo(customerId).get();
    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val() as Record<string, ReservationRecord>);
  }
}

export const reservationRepository = new ReservationRepository();