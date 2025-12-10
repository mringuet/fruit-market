import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitEditorComponent } from './fruit-editor-component';

describe('FruitEditorComponent', () => {
  let component: FruitEditorComponent;
  let fixture: ComponentFixture<FruitEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FruitEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruitEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
