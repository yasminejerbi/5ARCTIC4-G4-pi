import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptageFouleComponent } from './comptage-foule.component';

describe('ComptageFouleComponent', () => {
  let component: ComptageFouleComponent;
  let fixture: ComponentFixture<ComptageFouleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptageFouleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptageFouleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
