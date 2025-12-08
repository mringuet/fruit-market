import { Component, computed, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FruitStorageService } from '../../../services/fruit-storage.service';
import { IFruit } from '../fruit-list-component';
import { debounceTime, Subscription } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-fruit-form',
  imports: [ReactiveFormsModule],
  templateUrl: './fruit-form.html',
  styleUrl: './fruit-form.scss',
})
export class FruitForm {

  fruitStorageService = inject(FruitStorageService);
  listFruits = this.fruitStorageService.listFruits;

  get controls() {
    return this.fruitForm.controls;
  }
  
  fb = inject(FormBuilder);
  fruitForm = this.fb.group({
    name: ['', Validators.required],
    color: ['', Validators.required],
    variete: [''],
    stock: [1]
  });

  nameFruit = toSignal(this.fruitForm.controls.name.valueChanges, {
    initialValue: ''
  });

  isApple = computed(() => this.nameFruit()?.trim().toLowerCase() === 'pomme');

  constructor() {
    this.controls.name.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe(value => {
        const name = value?.toLowerCase().trim();
        const minStock = name === 'banane' ? 10 : 1;
        this.controls.stock.setValidators([Validators.required, Validators.min(minStock)]);
        this.controls.stock.updateValueAndValidity();

        if (name === 'pomme') {
                this.controls.variete?.setValidators([Validators.required]);

        }
        else {
      this.controls.variete?.clearValidators();
    }
    this.controls.variete?.updateValueAndValidity();


      });

  }

    //Autre façon de faire avec effect
  //   validationEffect = effect(() => {
  //   const name = (this.nameFruit() ?? '').trim().toLowerCase();

  //   // --- STOCK ---
  //   const minStock = name === 'banane' ? 10 : 1;
  //   this.controls.stock.setValidators([Validators.required, Validators.min(minStock)]);
  //   this.controls.stock.updateValueAndValidity({ emitEvent: false });

  //   // --- VARIÉTÉ ---
  //   if (name === 'pomme') {
  //     this.controls.variete?.setValidators([Validators.required]);
  //   } else {
  //     this.controls.variete?.clearValidators();
  //     this.controls.variete?.setValue('', { emitEvent: false }); // reset si nécessaire
  //   }
  //   this.controls.variete?.updateValueAndValidity({ emitEvent: false });
  // });





    async onSubmit() {
    if (this.fruitForm.valid) {
      const form = this.fruitForm.getRawValue() as IFruit;
      this.listFruits.update(fruits => [...fruits, form]);
      await this.fruitStorageService.saveFruits(this.listFruits());
      this.fruitForm.reset();
    }
  }

}
