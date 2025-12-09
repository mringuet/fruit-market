import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitPromoFormComponent } from './fruit-promo-form-component';

describe('FruitPromoFormComponent', () => {
  let component: FruitPromoFormComponent;
  let fixture: ComponentFixture<FruitPromoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitPromoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruitPromoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
