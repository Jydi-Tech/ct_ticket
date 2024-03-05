import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsUpdateComponent } from './parts-update.component';

describe('PartsUpdateComponent', () => {
  let component: PartsUpdateComponent;
  let fixture: ComponentFixture<PartsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartsUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
