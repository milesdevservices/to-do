import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITodo {
    Id: number;
    Name: string;
}

@Injectable({
    providedIn: 'root',
})
export class TodosService {
    constructor(private http: HttpClient) {}

    getAll(): Observable<ITodo[]> {
        return this.http.get<ITodo[]>('http://localhost:3000/todos');
    }
}
