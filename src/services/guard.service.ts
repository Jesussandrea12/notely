import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class MyGuard implements CanActivate {
    loggedIn = false;
    constructor(private authService: AuthService,
        private router: Router, public snackbar: MatSnackBar) {
        this.authService.isLogged()
            .subscribe((result) => {
                if (result && result.uid) {
                    this.loggedIn = true;
                } else {
                    this.loggedIn = false;
                    this.openSnackBar('You Must Login', 'Warning');
                    this.router.navigate(['/home']);
                }
            }, (error) => {
                this.loggedIn = false;
                this.openSnackBar('You Must Login', 'Error');
                this.router.navigate(['/home']);
            });
    }
    canActivate() {
        return this.loggedIn;
    }
    openSnackBar(message: string, action: string) {
        this.snackbar.open(message, action, { duration: 2500 });
    }
}
