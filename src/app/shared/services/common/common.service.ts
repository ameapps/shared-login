import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { FirebaseConfig } from '../../models/firebaseConfig';
import { UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  lastRegisteredUser!: User;
  lastLoggedUser!: User;
  lastforgotPswRequest!: User;
  fbUserConfig!: FirebaseConfig;
  fbApi: any;
  fbApiAnalytics: any;
  currentLoggedUser: UserCredential | undefined;

  constructor() { }
}
