import { Component, signal } from '@angular/core';
import { FruitListComponent } from "./fruit-list-component/fruit-list-component";
import { FruitEditorComponent } from "./fruit-editor-component/fruit-editor-component";

export interface IFruit {
  name: string;
  qty: number;
}

@Component({
  selector: 'app-stock-page-component',
  imports: [FruitListComponent, FruitEditorComponent],
  templateUrl: './stock-page-component.html',
  styleUrl: './stock-page-component.scss',
})
export class StockPageComponent {

  fruits = signal<IFruit[]>([
    {
      name: 'pomme',
      qty: 1
    },
    {
      name: 'orange',
      qty: 2
    },
    {
      name: 'clementine',
      qty: 3
    },

  ])

  selectedFruit = signal<IFruit | null>(null);

  selectFruit(fruit:IFruit){
    this.selectedFruit.set(fruit);
  }

  saveFruit(fruit:IFruit){
    console.log('fruit', fruit);
  }

}
