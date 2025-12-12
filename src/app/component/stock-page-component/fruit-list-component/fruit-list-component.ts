import { Component, input, output } from '@angular/core';
import { IFruit } from '../../fruit-list-component/fruit-list-component';

@Component({
  selector: 'app-fruit-list-component',
  imports: [],
  templateUrl: './fruit-list-component.html',
  styleUrl: './fruit-list-component.scss',
})
export class FruitListComponent {
  fruitsList = input<IFruit[]>();
  selectedFruit = output<IFruit>();
  removeFruit = output<number>();

  indexSelected = output<number>();


  selectFruit(fruit:IFruit, index:number){
    this.selectedFruit.emit(fruit);
    this.indexSelected.emit(index);
  }

  remove(index:number){
    this.removeFruit.emit(index);
  }
}
