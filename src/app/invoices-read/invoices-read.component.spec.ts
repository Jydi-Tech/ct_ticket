import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesReadComponent } from './invoices-read.component';

describe('InvoicesReadComponent', () => {
  let component: InvoicesReadComponent;
  let fixture: ComponentFixture<InvoicesReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoicesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
