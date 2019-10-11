import { Component } from '@angular/core';

@Component({
    templateUrl: './signup.component.html',
})
export class SignupComponent {
    email = '';
    password = '';

    constructor() {}

    signup(): void {
        console.log({ email: this.email, password: this.password });
    }
}
