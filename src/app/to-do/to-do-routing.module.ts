import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoListComponent } from './list/to-do-list.component';
import { AuthGuard } from '../common/auth/auth.guard';
import { ToDoInfoComponent } from './to-do-info/to-do-info.component';

const todoRoutes: Routes = [
    { path: 'todos', component: ToDoListComponent, canActivate: [AuthGuard] },
    {
        path: 'todos/:todoId',
        component: ToDoInfoComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(todoRoutes)],
})
export class ToDoRoutingModule {}
