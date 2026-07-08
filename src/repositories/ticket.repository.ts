import { COLLECTIONS } from "@/constants/collections";
import { adminDb } from "@/lib/firebase/admin";
import { BaseRepository } from "@/repositories/base.repository";
import type { TicketRecord } from "@/shared/types/domain";

export class TicketRepository extends BaseRepository<TicketRecord> {
  protected collectionPath = COLLECTIONS.tickets;

  async save(record: TicketRecord): Promise<void> {
    await this.ref(record.id).set(record);
  }

  async findByTokenHash(tokenHash: string): Promise<TicketRecord | null> {
    const snapshot = await adminDb.ref(this.collectionPath).orderByChild("qrTokenHash").equalTo(tokenHash).limitToFirst(1).get();
    if (!snapshot.exists()) return null;
    const values = Object.values(snapshot.val() as Record<string, TicketRecord>);
    return values[0] ?? null;
  }

  async listByCustomer(customerId: string): Promise<TicketRecord[]> {
    const snapshot = await adminDb.ref(this.collectionPath).orderByChild("customerId").equalTo(customerId).get();
    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val() as Record<string, TicketRecord>);
  }
}

export const ticketRepository = new TicketRepository();