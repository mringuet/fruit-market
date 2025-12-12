import { Injectable, signal } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { IFruit } from '../component/fruit-list-component/fruit-list-component';

@Injectable({
  providedIn: 'root'
})
export class FruitStorageService {

  private dbPromise: Promise<IDBPDatabase>;

  listFruits = signal<IFruit[]>([
    { name: 'banane', color: 'jaune', stock: 1 },
    { name: 'fraise', color: 'rouge', stock: 5 },
    { name: 'clémentine', color: 'orange', stock: 2 },
    { name: 'pomme', color: 'rouge', stock: 10 },

  ]);

  constructor() {
    this.dbPromise = openDB('fruit-market-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('fruits')) {
          db.createObjectStore('fruits');
        }
      }
    });
    this.initFruits();
  }

  async initFruits(){
    const fruits =  await this.getFruits();
    if(!fruits){
      await this.saveFruits(this.listFruits());
    }else{
      this.listFruits.set(fruits);
    }
  }

  async saveFruits(fruits: IFruit[]): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('fruits', 'readwrite');
    await tx.store.put(fruits, 'list'); // clé "list" → valeur = tableau de fruits
    await tx.done;
    this.listFruits.set(fruits);
  }

  async removeFruit(index: number): Promise<void> {
    const fruits = await this.getFruits();
    if (!fruits) return;
    fruits.splice(index, 1);
    this.listFruits.set(fruits);
    await this.saveFruits(fruits);

  }

  async getFruits(): Promise<IFruit[] | null> {
    const db = await this.dbPromise;
    return db.get('fruits', 'list');
  }

  async addFruits(fruit: IFruit): Promise<void> {
    const fruits = await this.getFruits() || [];
    this.listFruits.update(currentFruits => [...currentFruits, fruit]);
    await this.saveFruits([...fruits, fruit]);
  }

  async updateFruit(index: number, fruit: IFruit){
    const fruits = await this.getFruits() || [];
    const updatedFruit = [...fruits];
    updatedFruit[index] = fruit;
    await this.saveFruits(updatedFruit);
  }
}
