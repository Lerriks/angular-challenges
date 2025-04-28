import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TodoEffects } from './todo.effect';
import { Interceptor } from './todo.interceptor';
import { todoReducer } from './todo.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    provideStore(),
    provideState({ name: 'todo', reducer: todoReducer }),
    provideEffects(TodoEffects),
    provideStoreDevtools({
      maxAge: 25, // optional: limits action history
      logOnly: false, // set to true in production
    }),
  ],
};
