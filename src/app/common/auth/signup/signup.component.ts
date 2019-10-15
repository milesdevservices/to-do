import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
    templateUrl: './signup.component.html',
})
export class SignupComponent {
    first = '';
    last = '';
    phone = '';
    email = '';
    password = '';

    constructor(private authService: AuthService, private router: Router) {}

    signup(): void {
        const user = {
            First: this.first,
            Last: this.last,
            Phone: this.phone,
            Email: this.email,
            Password: this.password,
        };
        this.authService.create(user).subscribe((answer) => {
            this.router.navigateByUrl('/login');
        });
    }
}
