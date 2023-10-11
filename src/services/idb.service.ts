import Dexie, { Table } from 'dexie';

import { IChatRoomInStore } from '~/lib/interfaces/chat';

interface IDb extends Dexie {
  rooms?: Table<IChatRoomInStore>;
}

class IDBService {
  private static VERSION = 1;
  private db: IDb;

  constructor(dbName: string) {
    this.db = new Dexie(dbName);
    this.initStore();
  }

  private initStore() {
    this.db.version(IDBService.VERSION).stores({
      rooms: '&id,name', // It is not necessary to include all properties
    });
  }

  addRoom(room: IChatRoomInStore) {
    this.db.rooms?.put(room);
  }

  removeRoom(id: string) {
    this.db.rooms?.delete(id);
  }

  updateRoom(id: string, updates: Partial<Pick<IChatRoomInStore, 'messages' | 'name'>>) {
    this.db.rooms?.update(id, updates);
  }

  clearRooms() {
    this.db.rooms?.clear();
  }

  getRooms() {
    return this.db.rooms?.toArray();
  }
}

export const idbService = new IDBService('ChatDB');
