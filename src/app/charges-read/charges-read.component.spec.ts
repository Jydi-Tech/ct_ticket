import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesReadComponent } from './charges-read.component';

describe('ChargesReadComponent', () => {
  let component: ChargesReadComponent;
  let fixture: ComponentFixture<ChargesReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargesReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChargesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
