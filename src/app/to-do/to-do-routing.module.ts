import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoListComponent } from './list/to-do-list.component';
import { AuthGuard } from '../common/auth/auth.guard';
import { ToDoInfoComponent } from './to-do-info/to-do-info.component';
import { ToDoHeaderComponent } from './to-do-header/to-do-header.component';

const todoRoutes: Routes = [
    {
        path: 'todos',
        component: ToDoHeaderComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: ToDoListComponent,
                canActivate: [AuthGuard],
            },
            {
                path: ':todoId',
                component: ToDoInfoComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(todoRoutes)],
})
export class ToDoRoutingModule {}
