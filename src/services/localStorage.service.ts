import localStore from 'store';

interface ILocalStore {
  appName: string;
}

type StoreKeys = keyof ILocalStore;

export class LocalStorageService {
  static getItem<T extends StoreKeys>(key: T): ILocalStore[T] | null {
    return localStore.get(key);
  }

  static setItem<T extends StoreKeys>(key: T, value: ILocalStore[T]) {
    localStore.set(key, value);
  }
}
