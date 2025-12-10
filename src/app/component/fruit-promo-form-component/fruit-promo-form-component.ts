import { Component, computed, inject, input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-fruit-promo-form-component',
  providers: [provideNativeDateAdapter()],
  imports: [MatDatepickerModule, MatInputModule, MatSlideToggleModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './fruit-promo-form-component.html',
  styleUrl: './fruit-promo-form-component.scss',
})
export class FruitPromoFormComponent {
  private fb = inject(FormBuilder);
  fruits: string[] = ["banane", "fraise", "pomme"];

  prixInitial = input<number>(0); 
  prixFinal = computed(() => {
    const prix = this.prixInitial() ?? 0;
    const discount = this.controls['discount']?.value ?? 0;

    return prix * (1 - discount / 100);
  });


  promoForm = this.fb.group({
    fruitName: ['', Validators.required],
    discount: ['', [Validators.required, Validators.min(5), Validators.max(50)]],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    withConditions: [false],
    conditions: [''],
  }
    ,
    {
      validators: [this.dateRangeValidator()]
    }
  );

  get controls(): { [x: string]: FormControl; } {
    if (!this.promoForm) return {};
    return this.promoForm.controls as { [x: string]: FormControl; };
  }

  constructor(){
    this.controls['fruitName'].valueChanges.pipe(distinctUntilChanged(), takeUntilDestroyed()).subscribe((fruit)=>{

      const discountCtrl = this.controls['discount'];

      discountCtrl.clearValidators();
      const validators = [Validators.required];
      const nameFruit = fruit?.trim().toLowerCase() ?? '';
      
        if(nameFruit === 'banane'){
          validators.push(Validators.min(10), Validators.max(50))
        }
        else if(nameFruit === 'pomme'){
          validators.push(Validators.min(5), Validators.max(30))
        }else{
          validators.push(Validators.min(5), Validators.max(50))

        }

        discountCtrl.setValidators(validators);
        discountCtrl.updateValueAndValidity();

    });


     this.controls['withConditions'].valueChanges.pipe(distinctUntilChanged(), takeUntilDestroyed()).subscribe((withConditions)=>{

      const conditionCtrl = this.controls['conditions'];
      conditionCtrl.clearValidators();

        if(withConditions){
          conditionCtrl.setValidators([Validators.required])
        }else{
          conditionCtrl.setValue('');
        }
        conditionCtrl.updateValueAndValidity();

    })
  }

  dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl<string>): { [key: string]: any } | null => {
      const startDate = this.controls['startDate']?.value;
      const endDate = this.controls['endDate']?.value;
      if (!endDate || !startDate) return null;
      if (endDate < startDate) return { 'invalidDateRange': true };
      return null
    };
  }

}
