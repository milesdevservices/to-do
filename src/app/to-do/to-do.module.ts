import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListComponent } from './list/to-do-list.component';
import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoInfoComponent } from './to-do-info/to-do-info.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ToDoListComponent, ToDoInfoComponent],
    imports: [CommonModule, FormsModule, ToDoRoutingModule],
})
export class ToDoModule {}
