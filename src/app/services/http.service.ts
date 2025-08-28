// src/app/services/http.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface User {
  username: string;
  password: string;
  role: 'user' | 'admin';
}

@Injectable({ providedIn: 'root' })
export class HttpService {
  private databaseUrl = 'assets/database.json';

  constructor(private http: HttpClient) {}

  getUsers$(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(this.databaseUrl).pipe(
      map(res => res.users),
      catchError(this.handleError)
    );
  }

  getUserByUsername$(username: string): Observable<User | undefined> {
    return this.getUsers$().pipe(
      map(users =>
        users.find(u => u.username.toLowerCase() === username.trim().toLowerCase())
      )
    );
  }

  getUserByCreds$(username: string, password: string): Observable<User | undefined> {
    const pass = password.trim();
    return this.getUsers$().pipe(
      map(users =>
        users.find(
          u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === pass
        )
      )
    );
  }

  private handleError(err: any) {
    console.error('HTTP error:', err);
    return throwError(() => err);
  }
}
