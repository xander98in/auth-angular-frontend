import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }

  if( authService.authStatus() === AuthStatus.checking ) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
