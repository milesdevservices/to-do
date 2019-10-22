import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodosService } from '../../todos.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-to-do-info',
    templateUrl: './to-do-info.component.html',
})
export class ToDoInfoComponent implements OnInit {
    constructor(private toDosService: TodosService, private router: Router) {}

    ngOnInit() {}

    saveToDo(toDoForm: NgForm): void {
        if (toDoForm.valid) {
            this.toDosService.addToDo(toDoForm.value).subscribe((answer) => {
                this.router.navigateByUrl('/todos');
            });
        }
    }
}
