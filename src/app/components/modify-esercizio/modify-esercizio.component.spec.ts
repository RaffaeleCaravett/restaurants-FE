import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyEsercizioComponent } from './modify-esercizio.component';

describe('ModifyEsercizioComponent', () => {
  let component: ModifyEsercizioComponent;
  let fixture: ComponentFixture<ModifyEsercizioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyEsercizioComponent]
    });
    fixture = TestBed.createComponent(ModifyEsercizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
