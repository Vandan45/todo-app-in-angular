import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
})
export class TodoTableComponent implements OnInit {
  @Input() data: Todo[] = [];

  displayedColumns = ['id', 'taskName', 'actions'];
  dataSource: any;
  todoNameInput: string = '';
  currentItem = 'hello';

  constructor(private todoService: TodoService, public dialog: MatDialog) {}
  ngOnInit(): void {
    console.log('TODOtable data', this.data);
    this.dataSource = this.data;
  }

  addTodoTaskBtn() {
    let todoTask: Todo = new Todo();
    todoTask.taskName = this.todoNameInput;
    if (todoTask.taskName) {
      this.todoService.addTodoTask(todoTask).subscribe((res) => {
        console.log('POST Res', res);
        window.location.reload();
        this.todoNameInput = '';
      });
    } else {
      alert(`Please enter Task`);
    }
  }

  editIconClick(row: string) {
    console.log('edit icon works');
    row = JSON.parse(JSON.stringify(row));
    // row = Object.assign({}, row);
    this.openDialog(row);
  }

  doneIconClick(todoTaskDone: Todo) {
    console.log('done icon works');
    todoTaskDone.isDone = true;
    this.todoService.updateTodoTask(todoTaskDone).subscribe((res) => {
      console.log('PUT Res', res);
      window.location.reload();
    });
  }

  deleteIconClick(id: string) {
    console.log('delete icon works');
    if (confirm('Are you sure?')) {
      this.todoService.deleteTodoTask(id).subscribe((res) => {
        window.location.reload();
      });
    }
  }

  openDialog(payload: any = null): void {
    const dialogRef = this.dialog.open(TaskEditComponent, {
      width: '250px',
      data: payload,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        if (result.id) {
          this.todoService.updateTodoTask(result).subscribe((res) => {
            console.log('PUT Res', res);
            window.location.reload();
          });
        }
      }
    });
  }
}
