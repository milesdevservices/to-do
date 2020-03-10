import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './common/auth/login/login.component';
import { AuthGuard } from './common/auth/auth.guard';
import { ToDoListComponent } from './to-do/list/to-do-list.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: ToDoListComponent, canActivate: [AuthGuard] },
    { path: '**', component: ToDoListComponent, canActivate: [AuthGuard] },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
