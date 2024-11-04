import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptageESComponent } from './comptage-es.component';

describe('ComptageESComponent', () => {
  let component: ComptageESComponent;
  let fixture: ComponentFixture<ComptageESComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptageESComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptageESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
