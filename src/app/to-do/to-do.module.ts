import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListComponent } from './list/to-do-list.component';
import { ToDoRoutingModule } from './to-do-routing.module';

@NgModule({
    declarations: [ToDoListComponent],
    imports: [CommonModule, ToDoRoutingModule],
})
export class ToDoModule {}
