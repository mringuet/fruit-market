import { Component, inject, signal } from '@angular/core';
import { FruitListComponent } from "./fruit-list-component/fruit-list-component";
import { FruitEditorComponent } from "./fruit-editor-component/fruit-editor-component";
import { FruitStorageService } from '../../services/fruit-storage.service';
import { IFruit } from '../fruit-list-component/fruit-list-component';


@Component({
  selector: 'app-stock-page-component',
  imports: [FruitListComponent, FruitEditorComponent],
  templateUrl: './stock-page-component.html',
  styleUrl: './stock-page-component.scss',
})
export class StockPageComponent {

  fruitStorageService = inject(FruitStorageService);
  fruits = this.fruitStorageService.listFruits;



  fruitSelected = signal<IFruit | null>(null);
  indexSelect = signal<number | null>(null);

  selectFruit(fruit:IFruit){
    this.fruitSelected.set(fruit);
  }

  saveFruit(fruit:IFruit){
    console.log("index", this.indexSelect())
    if(this.indexSelect() !== null){
      console.log('UPDATE')
      this.fruitStorageService.updateFruit(this.indexSelect() as number, fruit);
    }else{
    this.fruitStorageService.addFruits(fruit);

    }
  }

  remove(index:number){
    this.fruitStorageService.removeFruit(index);
  }

}
