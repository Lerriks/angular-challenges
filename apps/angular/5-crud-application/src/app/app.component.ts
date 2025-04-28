import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from './model/todo.model';
import * as TodoActions from './todo.action';
import {
  selectLoading,
  selectLoadingForTodo,
  SelectTodos,
} from './todo.selector';

@Component({
  imports: [CommonModule, MatProgressBarModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
      {{ getLoadingState(todo.id) | async }}
      <mat-progress-bar
        *ngIf="getLoadingState(todo.id) | async"
        mode="indeterminate"></mat-progress-bar>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  loading$!: Observable<boolean>;
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
    this.todos$ = this.store.select(SelectTodos);
  }

  update(todo: Todo) {
    this.store.dispatch(TodoActions.updateTodo({ todo }));
  }

  delete(todo: Todo) {
    this.store.dispatch(TodoActions.deleteTodo({ id: todo.id }));
    console.log(this.store.select(selectLoading()));
  }

  getLoadingState(todoId: number): Observable<boolean> {
    return this.store.select(selectLoadingForTodo(todoId));
  }
  //constructor(private http: HttpClient, public todoService: TodoService, ) {}
  // ngOnInit(): void {
  //   this.http
  //     .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
  //     .subscribe((todos: Todo[]) => {
  //       this.todos = todos;
  //     });
  // }

  // update(todo: Todo) {
  //   this.todoService.updateTodo(todo)
  //     .subscribe((todoUpdated: Todo) => {
  //       this.todos = this.todos.map((t) => t.id !== todoUpdated.id ? t : todoUpdated);
  //     },
  //   );
  // }

  // delete(todo : Todo){
  //   this.todoService.deletePost(todo.id).subscribe(() => {
  //     this.todos = this.todos.filter((td) => td.id != todo.id)
  //     console.log('Post eliminato con successo!');
  //   });
  // }
}
