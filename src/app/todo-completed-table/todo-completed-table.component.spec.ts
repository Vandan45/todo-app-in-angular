import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCompletedTableComponent } from './todo-completed-table.component';

describe('TodoCompletedTableComponent', () => {
  let component: TodoCompletedTableComponent;
  let fixture: ComponentFixture<TodoCompletedTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoCompletedTableComponent]
    });
    fixture = TestBed.createComponent(TodoCompletedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
