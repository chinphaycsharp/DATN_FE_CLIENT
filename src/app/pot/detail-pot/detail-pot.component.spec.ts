import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPotComponent } from './detail-pot.component';

describe('DetailPotComponent', () => {
  let component: DetailPotComponent;
  let fixture: ComponentFixture<DetailPotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
