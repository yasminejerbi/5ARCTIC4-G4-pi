import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEventComponent } from './ajout-event.component';

describe('AjoutEventComponent', () => {
  let component: AjoutEventComponent;
  let fixture: ComponentFixture<AjoutEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
