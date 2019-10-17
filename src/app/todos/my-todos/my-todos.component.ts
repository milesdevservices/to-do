import { Component, OnInit } from '@angular/core';
import { TodosService, ITodo } from '../todos.service';

@Component({
    templateUrl: './my-todos.component.html',
})
export class MyTodosComponent implements OnInit {
    todos: ITodo[];

    constructor(private todosService: TodosService) {}

    ngOnInit(): void {
        this.todosService.getAll().subscribe((todos) => (this.todos = todos));
    }
}
