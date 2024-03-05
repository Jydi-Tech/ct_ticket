import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesUpdateComponent } from './charges-update.component';

describe('ChargesUpdateComponent', () => {
  let component: ChargesUpdateComponent;
  let fixture: ComponentFixture<ChargesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargesUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChargesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
