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

    get(searchText: string): Observable<IToDo[]> {
        return this.http.get<IToDo[]>(
            `http://localhost:3000/todos?Search=${searchText}`,
        );
    }

    getById(id: number): Observable<IToDo> {
        return this.http.get<IToDo>(`http://localhost:3000/todos/${id}`);
    }

    saveTodo(toDo: IToDo): Observable<IToDo> {
        const isEdit = toDo.Id > 0;
        if (isEdit) {
            return this.http.put<IToDo>(
                `http://localhost:3000/todos/${toDo.Id}`,
                toDo,
            );
        } else {
            return this.http.post<IToDo>('http://localhost:3000/todo', toDo);
        }
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`http://localhost:3000/todos/${id}`);
    }
}
