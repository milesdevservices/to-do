import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDoService, IToDo } from '../to-do.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../../common/auth/auth.service';

@Component({
    templateUrl: './to-do-list.component.html',
})
export class ToDoListComponent implements OnInit, OnDestroy {
    todos: IToDo[];
    searchText = '';
    isAdmin = false;
    searchUpdated = new Subject<string>();
    subscription = new Subscription();

    constructor(
        private todoService: ToDoService,
        private authService: AuthService,
    ) {
        this.subscription = this.searchUpdated
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe((searchValue) => {
                this.searchTodos(searchValue);
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    search($event): void {
        this.searchUpdated.next($event.target.value);
    }

    searchTodos(searchValue: string) {
        this.todoService.get(searchValue).subscribe((toDos) => {
            this.todos = toDos;
        });
    }

    ngOnInit(): void {
        this.todoService.get('').subscribe((returnedTodos) => {
            this.todos = returnedTodos;
        });
        console.log('isadmin', this.authService.isAdmin());

        this.isAdmin = this.authService.isAdmin();
    }
}
