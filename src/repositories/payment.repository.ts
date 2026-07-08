import { COLLECTIONS } from "@/constants/collections";
import { adminDb } from "@/lib/firebase/admin";
import { BaseRepository } from "@/repositories/base.repository";
import type { PaymentRecord } from "@/shared/types/domain";

export class PaymentRepository extends BaseRepository<PaymentRecord> {
  protected collectionPath = COLLECTIONS.payments;

  async listPending(): Promise<PaymentRecord[]> {
    const snapshot = await adminDb.ref(this.collectionPath).orderByChild("status").equalTo("pending").get();
    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val() as Record<string, PaymentRecord>);
  }
}

export const paymentRepository = new PaymentRepository();