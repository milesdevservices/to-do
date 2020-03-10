import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IToDo {
    Id: number;
    Name: string;
}

@Injectable({
    providedIn: 'root',
})
export class ToDoService {
    constructor(private http: HttpClient) {}

    get(): Observable<IToDo[]> {
        return this.http.get<IToDo[]>('http://localhost:3000/todos');
    }
}
