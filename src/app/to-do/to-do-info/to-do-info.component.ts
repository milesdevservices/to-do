import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { IToDo, ToDoService } from '../to-do.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-to-do-info',
    templateUrl: './to-do-info.component.html',
})
export class ToDoInfoComponent implements OnInit {
    isNew: boolean;

    todo: IToDo = {
        Id: 0,
        Name: '',
    };

    todoForm = new FormGroup({
        Name: new FormControl('', [Validators.required]),
    });

    constructor(
        private toDosService: ToDoService,
        private router: Router,
        private route: ActivatedRoute,
        private toastrService: ToastrService,
    ) {}

    ngOnInit(): void {
        const todoId: string = this.route.snapshot.params.todoId;
        if (todoId === 'add') {
            this.isNew = true;
        } else {
            this.isNew = false;
            this.toDosService.getById(+todoId).subscribe((todo) => {
                this.todo = todo;
                this.todoForm.setValue({ Name: todo.Name });
            });
        }
    }

    saveToDo(): void {
        if (this.todoForm.valid) {
            this.todo.Name = this.todoForm.value.Name;
            this.toDosService.saveTodo(this.todo).subscribe(
                (todo: IToDo) => {
                    this.router.navigate(['/todos']);
                    this.toastrService.success('Todo saved');
                },
                (errorResponse: HttpErrorResponse) => {
                    const message =
                        errorResponse.error.error || 'Todo save failed';
                    this.toastrService.error(message);
                },
            );
        }
    }
}
