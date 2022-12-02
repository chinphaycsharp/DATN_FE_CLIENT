import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPotComponent } from './all-pot.component';

describe('AllPotComponent', () => {
  let component: AllPotComponent;
  let fixture: ComponentFixture<AllPotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
