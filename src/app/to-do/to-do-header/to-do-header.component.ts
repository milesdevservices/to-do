import { Component, OnInit } from '@angular/core';
import { AuthService, IUser } from '../../common/auth/auth.service';

@Component({
    selector: 'app-to-do-header',
    templateUrl: './to-do-header.component.html',
})
export class ToDoHeaderComponent implements OnInit {
    userName: string;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        const user = this.authService.currentUser.getValue().user;
        this.userName = `${user.First} ${user.Last}'s`;
    }
}
