import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesUpdateComponent } from './invoices-update.component';

describe('InvoicesUpdateComponent', () => {
  let component: InvoicesUpdateComponent;
  let fixture: ComponentFixture<InvoicesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoicesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
