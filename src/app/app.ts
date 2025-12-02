import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FruitListComponent } from "./component/fruit-list-component/fruit-list-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FruitListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('fruit-market');
}
