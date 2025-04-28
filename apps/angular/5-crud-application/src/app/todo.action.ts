import { createAction, props } from '@ngrx/store';
import { Todo } from './model/todo.model';
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>(),
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>(),
);

export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: Todo }>(),
);
export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: Todo }>(),
);
export const updateTodoFailure = createAction(
  '[Todo] Update Todo Failure',
  props<{ id: number }>(),
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>(),
);
export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ id: number }>(),
);
