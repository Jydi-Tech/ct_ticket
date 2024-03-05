import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsDeleteComponent } from './comments-delete.component';

describe('CommentsDeleteComponent', () => {
  let component: CommentsDeleteComponent;
  let fixture: ComponentFixture<CommentsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
