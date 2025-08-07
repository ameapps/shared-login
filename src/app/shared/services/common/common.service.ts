import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  lastRegisteredUser!: User;
  lastLoggedUser!: User;
  lastforgotPswRequest!: User;

  constructor() { }
}
