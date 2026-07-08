import { COLLECTIONS } from "@/constants/collections";
import { BaseRepository } from "@/repositories/base.repository";
import type { TicketUsageRecord } from "@/shared/types/domain";

export class TicketUsageRepository extends BaseRepository<TicketUsageRecord> {
  protected collectionPath = COLLECTIONS.ticketUsages;

  async save(record: TicketUsageRecord): Promise<void> {
    const id = `${record.ticketId}_${record.accessItemId}`;
    await this.ref(id).set(record);
  }

  async getByTicketAndAccessItem(ticketId: string, accessItemId: string): Promise<TicketUsageRecord | null> {
    return this.getById(`${ticketId}_${accessItemId}`);
  }
}

export const ticketUsageRepository = new TicketUsageRepository();