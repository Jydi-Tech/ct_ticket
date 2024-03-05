import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsReadComponent } from './tickets-read.component';

describe('TicketsReadComponent', () => {
  let component: TicketsReadComponent;
  let fixture: ComponentFixture<TicketsReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
