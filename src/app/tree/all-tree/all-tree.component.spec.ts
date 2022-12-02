import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTreeComponent } from './all-tree.component';

describe('AllTreeComponent', () => {
  let component: AllTreeComponent;
  let fixture: ComponentFixture<AllTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
