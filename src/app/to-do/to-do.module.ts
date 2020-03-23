import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListComponent } from './list/to-do-list.component';
import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoInfoComponent } from './to-do-info/to-do-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoHeaderComponent } from './to-do-header/to-do-header.component';

@NgModule({
    declarations: [ToDoListComponent, ToDoInfoComponent, ToDoHeaderComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToDoRoutingModule,
    ],
})
export class ToDoModule {}
