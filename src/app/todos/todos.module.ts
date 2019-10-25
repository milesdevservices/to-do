import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { TodosRoutingModule } from './todos-routing.module';
import { MyTodosComponent } from './my-todos/my-todos.component';
import { ToDoInfoComponent } from './my-todos/to-do-info/to-do-info.component';
import { TodosHeaderComponent } from './my-todos/todos-header/todos-header.component';

@NgModule({
    declarations: [MyTodosComponent, ToDoInfoComponent, TodosHeaderComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        TodosRoutingModule,
    ],
})
export class TodosModule {}
