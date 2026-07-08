import { COLLECTIONS } from "@/constants/collections";
import { adminDb } from "@/lib/firebase/admin";
import { BaseRepository } from "@/repositories/base.repository";
import type { AccessItemRecord } from "@/shared/types/domain";

export class AccessItemRepository extends BaseRepository<AccessItemRecord> {
  protected collectionPath = COLLECTIONS.accessItems;

  async list(): Promise<AccessItemRecord[]> {
    const snapshot = await adminDb.ref(this.collectionPath).get();
    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val() as Record<string, AccessItemRecord>);
  }
}

export const accessItemRepository = new AccessItemRepository();