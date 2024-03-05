import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesCreateComponent } from './charges-create.component';

describe('ChargesCreateComponent', () => {
  let component: ChargesCreateComponent;
  let fixture: ComponentFixture<ChargesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargesCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChargesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
