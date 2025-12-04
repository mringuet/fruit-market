import { Component, signal, computed,inject } from '@angular/core';
import { DsfrFormSelectComponent } from '@edugouvfr/ngx-dsfr';
import { FruitStorageService } from '../../services/fruit-storage.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface IFruit {
  name:string;
  color:string;
  stock : number;
}

@Component({
  selector: 'app-fruit-list-component',
  imports: [DsfrFormSelectComponent, ReactiveFormsModule],
  templateUrl: './fruit-list-component.html',
  styleUrl: './fruit-list-component.scss',
})



export class FruitListComponent {

  fruitStorageService = inject(FruitStorageService);
  fb = inject(FormBuilder);
  fruitForm = this.fb.group({
    name: ['', Validators.required],
    color: ['', Validators.required],
    stock: [1]
  });



  listFruits = signal<IFruit[]>([
    { name: 'banane', color: 'jaune', stock:1},
    { name: 'fraise', color: 'rouge', stock:1},
    { name: 'clémentine', color: 'orange', stock:1},
    { name: 'pomme', color: 'rouge', stock:1},

]);


optionsColor = computed(() => this.listFruits().map((f) => ({value: f.color, label:f.color})).filter((opt, index, arr) =>
      arr.findIndex(o => o.value === opt.value) === index
    ));
  selectColor = signal<string>('');
  

listFruitsFiltered = computed(() => {
  const color = this.selectColor().trim();
  if (!color) return this.listFruits();
  return this.listFruits().filter(f => f.color.trim() === color);
});

  constructor(){
      this.initFruits();
  }

selectColorFilter(color:string){
  this.selectColor.set(color)
}

private async initFruits() {
  const savedFruits = await this.fruitStorageService.getFruits();

  if (savedFruits) {
    // DB a déjà des fruits → on les utilise
    this.listFruits.set(savedFruits);
  } else {
    // DB vide → on sauvegarde la liste par défaut
    await this.fruitStorageService.saveFruits(this.listFruits());
  }

}
  
  async onSubmit() {
    if (this.fruitForm.valid) {
      const form = this.fruitForm.getRawValue() as IFruit;
      this.listFruits.update(fruits => [...fruits, form]);
      await this.fruitStorageService.saveFruits(this.listFruits());
      this.fruitForm.reset();
    }
  }


}
