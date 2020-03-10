import { Component, OnInit } from '@angular/core';
import { ToDoService, IToDo } from '../to-do.service';

@Component({
    templateUrl: './to-do-list.component.html',
})
export class ToDoListComponent implements OnInit {
    todos: IToDo[];

    constructor(private todoService: ToDoService) {}

    ngOnInit(): void {
        this.todoService.get().subscribe((returnedTodos) => {
            this.todos = returnedTodos;
        });
    }
}
