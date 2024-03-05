import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsCreateComponent } from './parts-create.component';

describe('PartsCreateComponent', () => {
  let component: PartsCreateComponent;
  let fixture: ComponentFixture<PartsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartsCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
