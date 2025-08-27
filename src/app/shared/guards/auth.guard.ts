import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common/common.service';

export const authGuard: CanActivateFn = (route, state) => {
  const commonService = inject(CommonService);
  const router = inject(Router);
  const lastLoggedUser = commonService.getUserSession();  
  // Controlla che l'utente sia loggato e abbia un uId valido
  if (!lastLoggedUser || !lastLoggedUser.uId) {
    router.navigate(['/']); // redirect to login
    return false;
  }
  return true;
};
