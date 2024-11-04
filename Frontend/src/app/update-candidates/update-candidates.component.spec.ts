import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidatesComponent } from './update-candidates.component';

describe('UpdateCandidatesComponent', () => {
  let component: UpdateCandidatesComponent;
  let fixture: ComponentFixture<UpdateCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCandidatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
