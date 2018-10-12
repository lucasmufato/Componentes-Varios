import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaTablaComponent } from './prueba-tabla.component';

describe('PruebaTablaComponent', () => {
  let component: PruebaTablaComponent;
  let fixture: ComponentFixture<PruebaTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
