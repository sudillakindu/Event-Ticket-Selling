import { COLLECTIONS } from "@/constants/collections";
import { BaseRepository } from "@/repositories/base.repository";
import type { AuditLogRecord } from "@/shared/types/domain";

export class AuditLogRepository extends BaseRepository<AuditLogRecord> {
  protected collectionPath = COLLECTIONS.auditLogs;

  async save(record: AuditLogRecord): Promise<void> {
    await this.ref(record.id).set(record);
  }
}

export const auditLogRepository = new AuditLogRepository();