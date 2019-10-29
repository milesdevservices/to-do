import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodosService, ITodo } from '../todos.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { AuthService } from '../../common/auth/auth.service';

@Component({
    selector: 'app-my-todos',
    templateUrl: './my-todos.component.html',
})
export class MyTodosComponent implements OnInit, OnDestroy {
    todos: ITodo[];
    searchText = '';
    searchUpdated = new Subject<string>();
    subscription = new Subscription();

    constructor(
        private todosService: TodosService,
        private authService: AuthService,
    ) {
        this.subscription.add(
            this.searchUpdated
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                )
                .subscribe((newValue) => {
                    this.searchTodos(newValue);
                }),
        );

        // example of how to get and listen for changes in the
        // current user subject from the auth service
        this.subscription.add(
            this.authService.currentUser.subscribe((user) => {
                console.log(user);
            }),
        );
    }
    ngOnInit(): void {
        this.searchTodos('');
    }
    searchTodos(newValue: string): void {
        this.todosService.getAll(newValue).subscribe((toDos) => {
            this.todos = toDos;
        });
    }

    search($event): void {
        this.searchUpdated.next($event.target.value);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
