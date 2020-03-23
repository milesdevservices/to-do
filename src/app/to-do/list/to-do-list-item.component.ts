import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDoService, IToDo } from '../to-do.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-todo-list-item',
    templateUrl: './to-do-list-item.component.html',
})
export class ToDoListItemComponent {
    @Input() todo: IToDo;
    @Output() rebindList = new EventEmitter();

    constructor(
        private todoService: ToDoService,
        private toastrService: ToastrService,
    ) {}

    delete(event: MouseEvent): void {
        // stop the button click from bubbling out
        event.stopPropagation();
        event.preventDefault();
        // handle the delete
        this.todoService.delete(this.todo.Id).subscribe(() => {
            this.toastrService.success('Todo deleted');
            this.rebindList.emit();
        });
    }

    complete(event: MouseEvent): void {
        // stop the button click from bubbling out
        event.stopPropagation();
        event.preventDefault();
        this.toastrService.info(
            'That functionality is not implemented yet.  Check back later.',
        );
    }
}
