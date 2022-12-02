import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllToolComponent } from './all-tool.component';

describe('AllToolComponent', () => {
  let component: AllToolComponent;
  let fixture: ComponentFixture<AllToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
