import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyTodosComponent } from './my-todos/my-todos.component';
import { AuthGuard } from '../common/auth/auth.guard';
import { ToDoInfoComponent } from './my-todos/to-do-info/to-do-info.component';

const routes: Routes = [
    { path: 'todos', component: MyTodosComponent, canActivate: [AuthGuard] },
    {
        path: 'todos/add',
        component: ToDoInfoComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class TodosRoutingModule {}
