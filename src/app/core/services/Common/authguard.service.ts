import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

export const AuthguardService: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (inject(LoginService).getToken()) {
    return true;
  } else {
    inject(LoginService).logout()
    inject(Router).navigate(['/login']); 
    return false;
  }
};