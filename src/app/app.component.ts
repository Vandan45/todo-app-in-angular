import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-list-app';
  todoData: Todo[] = [];
  todoCompletedData: Todo[] = [];
  isLoading: boolean = true;

  constructor(private todoService: TodoService) {
    this.loadData();
  }

  loadData() {
    this.todoService.getTodosData().subscribe(
      (response) => {
        this.todoData = response.filter((x) => !x.isDone);
        this.todoCompletedData = response.filter((x) => x.isDone);
        this.isLoading = false;
        console.log('Todo response', response);
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
}
