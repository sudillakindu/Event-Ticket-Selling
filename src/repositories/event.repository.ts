import crypto from "crypto";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/constants/collections";
import { createSlug } from "@/utils/slug";
import type { EventRecord } from "@/shared/types/domain";
import { BaseRepository } from "@/repositories/base.repository";

export class EventRepository extends BaseRepository<EventRecord> {
  protected collectionPath = COLLECTIONS.events;

  async list(): Promise<EventRecord[]> {
    const snapshot = await adminDb.ref(this.collectionPath).get();
    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val() as Record<string, EventRecord>);
  }

  async save(event: Omit<EventRecord, "slug" | "id" | "createdAt" | "updatedAt"> & Partial<Pick<EventRecord, "id">>): Promise<EventRecord> {
    const now = Date.now();
    const id = event.id ?? adminDb.ref(this.collectionPath).push().key ?? crypto.randomUUID();
    const record: EventRecord = {
      ...event,
      id,
      slug: createSlug(event.title),
      createdAt: now,
      updatedAt: now
    };
    await this.ref(id).set(record);
    return record;
  }
}

export const eventRepository = new EventRepository();