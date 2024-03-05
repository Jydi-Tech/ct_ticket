import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsReadComponent } from './parts-read.component';

describe('PartsReadComponent', () => {
  let component: PartsReadComponent;
  let fixture: ComponentFixture<PartsReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartsReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
