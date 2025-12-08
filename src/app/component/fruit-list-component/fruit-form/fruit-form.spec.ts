import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitForm } from './fruit-form';

describe('FruitForm', () => {
  let component: FruitForm;
  let fixture: ComponentFixture<FruitForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruitForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
