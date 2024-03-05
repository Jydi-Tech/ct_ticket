import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDeleteComponent } from './customers-delete.component';

describe('CustomersDeleteComponent', () => {
  let component: CustomersDeleteComponent;
  let fixture: ComponentFixture<CustomersDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
