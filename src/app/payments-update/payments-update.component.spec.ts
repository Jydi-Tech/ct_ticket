import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsUpdateComponent } from './payments-update.component';

describe('PaymentsUpdateComponent', () => {
  let component: PaymentsUpdateComponent;
  let fixture: ComponentFixture<PaymentsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
