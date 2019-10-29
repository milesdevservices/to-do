import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(private router: Router, private authService: AuthService) {}

    login(): void {
        // logging form so that we could inspect it in class
        // could instead be checking if the form is valid prior
        // to sending the login request
        console.log(this.loginForm);

        this.authService
            .login(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(
                (response) => {
                    if (response.success) {
                        console.log('successful login');
                        this.router.navigateByUrl('/todos');
                    }
                },
                (error) => {
                    console.log('username/password incorrect');
                },
            );
    }
}
