import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IToDo, ToDoService } from '../to-do.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-to-do-info',
    templateUrl: './to-do-info.component.html',
})
export class ToDoInfoComponent {
    constructor(private toDosService: ToDoService, private router: Router) {}
    /*
Service to save the form and populate a todo*/

    saveToDo(toDoForm: NgForm): void {
        if (toDoForm.valid) {
            const toDo: IToDo = toDoForm.value;
            toDo.Id = 0;
            this.toDosService.saveTodo(toDo).subscribe((todo: IToDo) => {
                this.router.navigate(['/todos']);
            });
        }
    }
}
