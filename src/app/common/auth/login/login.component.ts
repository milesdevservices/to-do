import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {
    email = '';
    password = '';
    showSignup = false;

    constructor(private router: Router, private authService: AuthService) {}

    toggleSignup(): void {
        this.showSignup = !this.showSignup;
        this.email = '';
        this.password = '';
    }

    login(): void {
        this.authService.login(this.email, this.password).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful login');
                    this.router.navigateByUrl('/home');
                }
            },
            (error) => {
                console.log('username/password incorrect');
            },
        );
    }

    signup(): void {
        const payload = {
            email: this.email,
            password: this.password,
        };
        console.log(payload);
    }
}
