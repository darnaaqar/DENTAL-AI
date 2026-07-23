/**
 * Hive-style browser local database cache for syncing Supabase tables locally.
 * Acts as a fast local NoSQL key-value store box for instant offline-first rendering.
 */

const STORAGE_PREFIX = 'hive_box_';

export class HiveBox<T = any> {
  private boxName: string;

  constructor(boxName: string) {
    this.boxName = boxName;
  }

  private getKey(key: string): string {
    return `${STORAGE_PREFIX}${this.boxName}_${key}`;
  }

  public get(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
      const value = localStorage.getItem(this.getKey(key));
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.warn(`HiveBox [${this.boxName}] error reading key ${key}:`, e);
      return null;
    }
  }

  public put(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
    } catch (e) {
      console.warn(`HiveBox [${this.boxName}] error writing key ${key}:`, e);
    }
  }

  public delete(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (e) {
      console.warn(`HiveBox [${this.boxName}] error deleting key ${key}:`, e);
    }
  }

  public clear(): void {
    if (typeof window === 'undefined') return;
    try {
      const keysToRemove: string[] = [];
      const prefix = `${STORAGE_PREFIX}${this.boxName}_`;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      console.warn(`HiveBox [${this.boxName}] clear error:`, e);
    }
  }
}

// Instantiate standard clinic boxes
export const settingsHiveBox = new HiveBox<any>('settings');
export const doctorsHiveBox = new HiveBox<any[]>('doctors');
export const servicesHiveBox = new HiveBox<any[]>('services');
export const galleryHiveBox = new HiveBox<any[]>('gallery');
export const appointmentsHiveBox = new HiveBox<any[]>('appointments');
