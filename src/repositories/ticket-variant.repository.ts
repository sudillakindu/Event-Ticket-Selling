import { COLLECTIONS } from "@/constants/collections";
import { adminDb } from "@/lib/firebase/admin";
import { BaseRepository } from "@/repositories/base.repository";
import type { TicketVariantRecord } from "@/shared/types/domain";

export class TicketVariantRepository extends BaseRepository<TicketVariantRecord> {
  protected collectionPath = COLLECTIONS.ticketVariants;

  async listByEvent(eventId: string): Promise<TicketVariantRecord[]> {
    const snapshot = await adminDb.ref(this.collectionPath).orderByChild("eventId").equalTo(eventId).get();
    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val() as Record<string, TicketVariantRecord>);
  }
}

export const ticketVariantRepository = new TicketVariantRepository();