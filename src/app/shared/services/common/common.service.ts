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
  lastLoggedUser?: User;
  lastforgotPswRequest!: User;
  fbUserConfig!: FirebaseConfig;
  fbApp: FirebaseApp | undefined;
  fbApiAnalytics: any;
  appConfig!: DefaultConfig;


  constructor() {
  }

  getUserSession(): User {
    // Recupera lo stato di login da localStorage all'avvio
    const userJson = localStorage.getItem('lastLoggedUser');
    if (userJson) {
      try {
        this.lastLoggedUser = JSON.parse(userJson);
      } catch {
        this.lastLoggedUser = undefined;
      }
    }
    // Return the user or throw an error if not found
    if (this.lastLoggedUser) {
      return this.lastLoggedUser;
    } else {
      throw new Error('No user session found');
    }
  }

  saveUserSession(): boolean {
    try {
      if (this.lastLoggedUser) {
        const session = {
          ...this.lastLoggedUser,
          loginTime: Date.now()
        };
        localStorage.setItem('lastLoggedUser', JSON.stringify(session));
      } else {
        localStorage.removeItem('lastLoggedUser');
      }
      return true;
    } catch (error) {
      console.error('Errore nel salvataggio della sessione utente:', error);
      return false;
    }
  }
}
