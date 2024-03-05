import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesDeleteComponent } from './employees-delete.component';

describe('EmployeesDeleteComponent', () => {
  let component: EmployeesDeleteComponent;
  let fixture: ComponentFixture<EmployeesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
