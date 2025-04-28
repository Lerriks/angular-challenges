import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from './service/todo.service';
import * as TodoActions from './todo.action';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService,
  ) {}
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) => of(TodoActions.loadTodosFailure({ error }))),
          //tap(todos => console.log(todos)),
        ),
      ),
    ),
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap(({ todo }) =>
        this.todoService
          .updateTodo(todo)
          .pipe(
            map((updatedTodo) =>
              TodoActions.updateTodoSuccess({ todo: updatedTodo }),
            ),
          ),
      ),
    ),
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap(({ id }) =>
        this.todoService
          .deletePost(id)
          .pipe(map(() => TodoActions.deleteTodoSuccess({ id }))),
      ),
    ),
  );
}
