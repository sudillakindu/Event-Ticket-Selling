import { COLLECTIONS } from "@/constants/collections";
import { BaseRepository } from "@/repositories/base.repository";
import type { UserRecord } from "@/shared/types/domain";

export class UserRepository extends BaseRepository<UserRecord> {
  protected collectionPath = COLLECTIONS.users;

  async upsertUser(user: UserRecord): Promise<void> {
    await this.ref(user.uid).set(user);
  }

  async findByUid(uid: string): Promise<UserRecord | null> {
    return this.getById(uid);
  }
}

export const userRepository = new UserRepository();