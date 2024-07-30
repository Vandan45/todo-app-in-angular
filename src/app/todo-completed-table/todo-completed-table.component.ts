import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-completed-table',
  templateUrl: './todo-completed-table.component.html',
  styleUrls: ['./todo-completed-table.component.scss'],
})
export class TodoCompletedTableComponent implements OnInit {
  @Input() completedTask: Todo[] = [];

  displayedColumns = ['id', 'taskName', 'actions'];
  dataSource: any;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.dataSource = this.completedTask;
  }

  deleteIconClick(id: string) {
    console.log('delete icon works');
    if (confirm('Are you sure?')) {
      this.todoService.deleteTodoTask(id).subscribe((res) => {
        window.location.reload();
      });
    }
  }
}
