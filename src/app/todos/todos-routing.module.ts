import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyTodosComponent } from './my-todos/my-todos.component';
import { AuthGuard } from '../common/auth/auth.guard';
import { ToDoInfoComponent } from './my-todos/to-do-info/to-do-info.component';
import { TodosHeaderComponent } from '../todos/my-todos/todos-header/todos-header.component';

const routes: Routes = [
    {
        path: 'todos',
        component: TodosHeaderComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: MyTodosComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'add',
                component: ToDoInfoComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class TodosRoutingModule {}
