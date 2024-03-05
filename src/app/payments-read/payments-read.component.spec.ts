import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsReadComponent } from './payments-read.component';

describe('PaymentsReadComponent', () => {
  let component: PaymentsReadComponent;
  let fixture: ComponentFixture<PaymentsReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
