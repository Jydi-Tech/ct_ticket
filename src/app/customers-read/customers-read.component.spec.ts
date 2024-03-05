import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersReadComponent } from './customers-read.component';

describe('CustomersReadComponent', () => {
  let component: CustomersReadComponent;
  let fixture: ComponentFixture<CustomersReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
