import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { TodosRoutingModule } from './todos-routing.module';
import { MyTodosComponent } from './my-todos/my-todos.component';

@NgModule({
    declarations: [MyTodosComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        TodosRoutingModule,
    ],
})
export class TodosModule {}
