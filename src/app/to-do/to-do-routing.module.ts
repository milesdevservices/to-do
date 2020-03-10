import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoListComponent } from './list/to-do-list.component';
import { AuthGuard } from '../common/auth/auth.guard';

const todoRoutes: Routes = [
    { path: 'todos', component: ToDoListComponent, canActivate: [AuthGuard] },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(todoRoutes)],
})
export class ToDoRoutingModule {}
