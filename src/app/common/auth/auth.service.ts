import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { UserRoles } from '../user-roles';

export interface IUser {
    first: string;
    last: string;
    email: string;
    phone: string;
    userRoleId: number;
}

export interface ILoginResponse {
    success: boolean;
    token?: string;
    user?: IUser;
}

export interface ICurrentlyLoggedInUser {
    token: string;
    user: IUser;
}

const tokenCookieKey = 'to-do-app-token-cookie';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    currentUser: BehaviorSubject<ICurrentlyLoggedInUser> = new BehaviorSubject<
        ICurrentlyLoggedInUser
    >(null);

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
    ) {
        const token = this.cookieService.get(tokenCookieKey);
        if (token) {
            const loggedInUser: ICurrentlyLoggedInUser = JSON.parse(token);
            this.currentUser.next(loggedInUser);
        }
    }

    isAuthenticated(): boolean {
        const currentUser = this.currentUser.getValue();
        return currentUser && currentUser.token ? true : false;
    }

    isAdmin(): boolean {
        const currentUser = this.currentUser.getValue();
        return currentUser &&
            currentUser.user &&
            currentUser.user.userRoleId === UserRoles.Admin
            ? true
            : false;
    }

    login(email: string, password: string): Observable<ILoginResponse> {
        const data = {
            Email: email,
            Password: password,
        };
        return this.http
            .post<ILoginResponse>('http://localhost:3000/login', data)
            .pipe(
                tap((response) => {
                    const currentUser: any =
                        response &&
                        response.success &&
                        response.token &&
                        response.user
                            ? response
                            : null;
                    this.setUser(currentUser);
                }),
            );
    }

    logout(): void {
        this.setUser(null);
    }

    setUser(user: ICurrentlyLoggedInUser): void {
        this.currentUser.next(user);
        if (user) {
            const userAsJson = JSON.stringify(user);
            this.cookieService.put(tokenCookieKey, userAsJson);
        } else {
            this.cookieService.remove(tokenCookieKey);
        }
    }
}
