import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from '../services/common/common.service';

export const authGuard: CanActivateFn = (route, state) => {
  const commonService = inject(CommonService);
  const router = inject(Router);
  if (!commonService.currentLoggedUser) {
    router.navigate(['/']); // redirect to login
    return false;
  }
  return true;
};
