import { Component, input, output } from '@angular/core';
import { IFruit } from '../stock-page-component';

@Component({
  selector: 'app-fruit-list-component',
  imports: [],
  templateUrl: './fruit-list-component.html',
  styleUrl: './fruit-list-component.scss',
})
export class FruitListComponent {
  fruitsList = input<IFruit[]>();
  selectedFruit = output<IFruit>();

  selectFruit(fruit:IFruit){
    this.selectedFruit.emit(fruit);
  }
}
