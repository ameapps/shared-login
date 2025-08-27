import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { FirebaseConfig } from '../../models/firebaseConfig';
import { UserCredential } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { DefaultConfig } from '../../models/default.config.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  lastRegisteredUser!: User;
  lastLoggedUser!: User;
  lastforgotPswRequest!: User;
  fbUserConfig!: FirebaseConfig;
  fbApp: FirebaseApp | undefined;
  fbApiAnalytics: any;
  appConfig!: DefaultConfig;


  constructor() {
  }

  saveUserSession(user: UserCredential | undefined) {
  }
}
