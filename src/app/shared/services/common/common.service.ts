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
  currentLoggedUser: UserCredential | undefined;
  appConfig!: DefaultConfig;

  /**
   * Constructor
   * @description Recupera lo stato di login da localStorage all'avvio del servizio
   *              e lo setta come currentLoggedUser. Se non riesce a parseare il valore
   *              lo setta a undefined.
   */
  constructor() {
    // Recupera lo stato di login da localStorage all'avvio
    const userJson = localStorage.getItem('currentLoggedUser');
    if (userJson) {
      try {
        this.currentLoggedUser = JSON.parse(userJson);
      } catch {
        this.currentLoggedUser = undefined;
      }
    }
  }

  setLoggedUser(user: UserCredential | undefined) {
    this.currentLoggedUser = user;
    if (user) {
      localStorage.setItem('currentLoggedUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentLoggedUser');
    }
  }
}
