import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoUrl = 'http://localhost:3000/todos'; // URL to web api

  constructor(private http: HttpClient) {}
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET heroes from the server */
  // getTodosData(): Observable<Todo[]> {
  //   return this.http.get<Todo[]>(this.todoUrl);
  // }

  /** GET heroes from the server */
  getTodosData(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl);
  }

  /** POST: add a new task to the database */
  addTodoTask(todoTask: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todoUrl, todoTask);
  }

  /** PUT: update the task on the server */
  updateTodoTask(todoTask: Todo): Observable<any> {
    return this.http.put(this.todoUrl + '/' + todoTask.id, todoTask);
  }

  /** DELETE: delete the task from the server */
  deleteTodoTask(id: string) {
    return this.http.delete(this.todoUrl + '/' + id);
  }
}
