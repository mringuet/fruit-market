import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IFruit } from '../../fruit-list-component/fruit-list-component';

@Component({
  selector: 'app-fruit-editor-component',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './fruit-editor-component.html',
  styleUrl: './fruit-editor-component.scss',
})
export class FruitEditorComponent {
  fb = inject(FormBuilder);

  fruitForm = this.fb.group({
    name: [''],
    stock: [0]
  })


  fruit = input<IFruit | null>()
  fruitTemp = signal<IFruit | undefined | null>(null);
  fruitSave = output<IFruit>();

  //   isValid = computed(() => {
  //     const fruitTemp = this.fruitTemp();
  //     return fruitTemp && fruitTemp?.stock && fruitTemp.stock > 0;
  // })

  isValid = signal(false);


  constructor() {

    this.fruitForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        const name = this.fruitForm.get('name')?.value?.trim();
        const stock = this.fruitForm.get('stock')?.value ?? 0;
        this.isValid.set(!!name && stock > 0)
      });


    effect(() => {
      this.fruitTemp.set(this.fruit());
      this.fruitForm.patchValue({ name: this.fruitTemp()?.name, stock: this.fruitTemp()?.stock });


    })
  }

  save() {
    const name = this.fruitForm.get('name')?.value || '';
    const stock = this.fruitForm.get('stock')?.value ?? 0;
    const color = 'red';
    this.fruitSave.emit({ name,color, stock });
  }
}
