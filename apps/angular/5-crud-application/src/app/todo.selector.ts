import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

export const selectTodoState = createFeatureSelector<TodoState>('todo');

export const SelectTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos,
);
export const selectLoadingForTodo = (id: number) =>
  createSelector(
    selectTodoState,
    (state: TodoState) => state.loading[id] || false,
  );
export const selectLoading = () =>
  createSelector(selectTodoState, (state: TodoState) => state.loading);
