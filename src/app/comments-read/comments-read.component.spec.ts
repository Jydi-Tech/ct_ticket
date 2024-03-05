import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsReadComponent } from './comments-read.component';

describe('CommentsReadComponent', () => {
  let component: CommentsReadComponent;
  let fixture: ComponentFixture<CommentsReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
