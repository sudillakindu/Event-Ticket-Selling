import { COLLECTIONS } from "@/constants/collections";
import { BaseRepository } from "@/repositories/base.repository";
import type { QrTokenRecord } from "@/shared/types/domain";

export class QrTokenRepository extends BaseRepository<QrTokenRecord> {
  protected collectionPath = COLLECTIONS.qrTokens;

  async save(record: QrTokenRecord): Promise<void> {
    await this.ref(record.tokenHash).set(record);
  }

  async getByHash(tokenHash: string): Promise<QrTokenRecord | null> {
    return this.getById(tokenHash);
  }
}

export const qrTokenRepository = new QrTokenRepository();