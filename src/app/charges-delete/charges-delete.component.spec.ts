import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesDeleteComponent } from './charges-delete.component';

describe('ChargesDeleteComponent', () => {
  let component: ChargesDeleteComponent;
  let fixture: ComponentFixture<ChargesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargesDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChargesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
