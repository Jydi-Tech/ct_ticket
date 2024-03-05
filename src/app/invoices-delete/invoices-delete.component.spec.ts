import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesDeleteComponent } from './invoices-delete.component';

describe('InvoicesDeleteComponent', () => {
  let component: InvoicesDeleteComponent;
  let fixture: ComponentFixture<InvoicesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoicesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
