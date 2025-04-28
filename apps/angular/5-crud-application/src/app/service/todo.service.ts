import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/todos';
  isLoading = signal<number[]>([]);

  constructor(private http: HttpClient) {}

  public showLoader(id: number): void {
    this.isLoading.update((ids) => [...ids, id]);
    // this.isLoading.set(true);
  }

  public hideLoader(id: number): void {
    this.isLoading.update((ids) => ids.filter((i) => i !== id));
    // this.isLoading.set(false);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.API_URL}/${id}`);
  }

  getTodos(): Observable<Todo[]> {
    console.log(`${this.API_URL}`);
    // this.http.get<Todo[]>(`${this.API_URL}`).subscribe((x) => console.log(x));
    // console.log("aaa");

    return this.http.get<Todo[]>(`${this.API_URL}`);
  }

  updateTodo(todo: Todo): Observable<any> {
    const url = `${this.API_URL}/${todo.id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      todo: todo.id,
      title: randText(),
      userId: todo.userID,
    };

    return this.http.put(url, JSON.stringify(body), { headers });
  }

  deletePost(id: number): Observable<void> {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    return this.http.delete<void>(url);
  }
}
