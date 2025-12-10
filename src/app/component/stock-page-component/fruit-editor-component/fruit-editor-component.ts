import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { IFruit } from '../stock-page-component';
import { FormBuilder, ReactiveFormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    qty : [0]
})


  fruit = input<IFruit | null>()
  fruitTemp = signal<IFruit | undefined | null>(null);
  fruitSave = output<IFruit>();

//   isValid = computed(() => {
//     const fruitTemp = this.fruitTemp();
//     return fruitTemp && fruitTemp?.qty && fruitTemp.qty > 0;
// })

isValid = computed(() => {
  const name = this.fruitForm.get('name')?.value?.trim();
  const qty = this.fruitForm.get('qty')?.value ?? 0;
  return !!name && qty > 0;
});


  constructor(){

    this.fruitForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        this.fruitTemp.set({ 
          name: value.name ?? '', 
          qty: value.qty ?? 0 
        });
      });


    effect(() => {
      this.fruitTemp.set(this.fruit());
      this.fruitForm.patchValue({name:this.fruitTemp()?.name, qty:this.fruitTemp()?.qty})
    })
  }

  save(){

    const name = this.fruitForm.get('name')?.value || '';
    const qty = this.fruitForm.get('qty')?.value ?? 0;
    this.fruitSave.emit({name, qty});


  }
}
