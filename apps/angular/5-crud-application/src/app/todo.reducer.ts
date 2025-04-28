import { createReducer, on } from '@ngrx/store';
import { Todo } from './model/todo.model';
import * as TodoActions from './todo.action';

export interface TodoState {
  todos: Todo[];
  loading: { [key: number]: boolean };
  error: any;
}

export const initialState: TodoState = {
  todos: [],
  error: null,
  loading: {},
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: { ...state.loading, [1]: false },
  })),
  on(TodoActions.updateTodo, (state, { todo }) => ({
    ...state,
    loading: { ...state.loading, [todo.id]: true }, // Set loading to true for the specific todo
  })),
  on(TodoActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    loading: { ...state.loading, [todo.id]: false }, // Set loading to false after update
  })),
  on(TodoActions.updateTodoFailure, (state, { id }) => ({
    ...state,
    loading: { ...state.loading, [id]: false },
  })),
  on(TodoActions.deleteTodo, (state, { id }) => ({
    ...state,
    loading: { ...state.loading, [id]: true }, // Set loading to true for the specific todo
  })),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((t) => t.id !== id),
    loading: { ...state.loading, [id]: false }, // Set loading to false after delete
  })),
);
