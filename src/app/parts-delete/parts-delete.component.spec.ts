import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsDeleteComponent } from './parts-delete.component';

describe('PartsDeleteComponent', () => {
  let component: PartsDeleteComponent;
  let fixture: ComponentFixture<PartsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartsDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
