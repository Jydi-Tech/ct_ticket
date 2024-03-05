import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesReadComponent } from './employees-read.component';

describe('EmployeesReadComponent', () => {
  let component: EmployeesReadComponent;
  let fixture: ComponentFixture<EmployeesReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
