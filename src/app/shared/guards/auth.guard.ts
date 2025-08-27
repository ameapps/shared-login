import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common/common.service';

export const authGuard: CanActivateFn = (route, state) => {
  const commonService = inject(CommonService);
  const router = inject(Router);
  // Controlla che l'utente sia loggato e abbia un uId valido
  if (!commonService.lastLoggedUser || !commonService.lastLoggedUser.uId) {
    router.navigate(['/']); // redirect to login
    return false;
  }
  return true;
};
