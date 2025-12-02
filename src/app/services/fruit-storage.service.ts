import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { IFruit } from '../component/fruit-list-component/fruit-list-component';

@Injectable({
  providedIn: 'root'
})
export class FruitStorageService {

  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = openDB('fruit-market-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('fruits')) {
          db.createObjectStore('fruits');
        }
      }
    });
  }

  async saveFruits(fruits: IFruit[]): Promise<void> {
  const db = await this.dbPromise;
  const tx = db.transaction('fruits', 'readwrite');
  await tx.store.put(fruits, 'list'); // clé "list" → valeur = tableau de fruits
  await tx.done;
}

async getFruits(): Promise<IFruit[] | null> {
  const db = await this.dbPromise;
  return db.get('fruits', 'list');
}

  async addFruits(fruit: IFruit): Promise<void> {
      const db = await this.dbPromise;
      const fruits = await this.getFruits();
      if(!fruits) return;
      const newFruits = [...fruits,fruit];
      await this.saveFruits(newFruits)
    

  }
}
