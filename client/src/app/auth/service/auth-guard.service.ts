import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.loggedIn) {
      this.router.navigate(['signIn']);
      return false;
    }
    return true;
  }

  canActivateChild(): boolean {
    if (!this.auth.loggedIn) {
      this.router.navigate(['signIn']);
      return false;
    }
    return true;
  }
}
