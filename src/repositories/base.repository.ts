import { adminDb } from "@/lib/firebase/admin";

export abstract class BaseRepository<T extends { id: string }> {
  protected abstract collectionPath: string;

  protected ref(id?: string) {
    return id ? adminDb.ref(`${this.collectionPath}/${id}`) : adminDb.ref(this.collectionPath);
  }

  async getById(id: string): Promise<T | null> {
    const snapshot = await this.ref(id).get();
    return snapshot.exists() ? (snapshot.val() as T) : null;
  }
}