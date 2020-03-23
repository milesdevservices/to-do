import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './common/auth/login/login.component';
import { AuthGuard } from './common/auth/auth.guard';
import { ToDoHeaderComponent } from './to-do/to-do-header/to-do-header.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', component: ToDoHeaderComponent, canActivate: [AuthGuard] },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
