import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterForumComponent } from './ajouter-forum.component';

describe('AjouterForumComponent', () => {
  let component: AjouterForumComponent;
  let fixture: ComponentFixture<AjouterForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterForumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
