import { Injectable } from '@angular/core';
import { FirebaseConfig } from '../../models/firebaseConfig';
import { AssetsService } from '../assets/assets.service';
import { CommonService } from '../common/common.service';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { User } from '../../models/user.model';

import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { FirebaseHelper } from '../../helpers/firebaseHelper';
import { getDatabase, ref, get } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private common_service: CommonService,
    private assets_service: AssetsService
  ) {}

  // #region helpers

  /**Metodo che inizializza la connessione con firebase */
  startFbApi(fbConfig: FirebaseConfig): boolean {
    try {
      this.common_service.fbApp = initializeApp(fbConfig as any);
      this.common_service.fbApiAnalytics = getAnalytics(
        this.common_service.fbApp
      );
      console.log('API Firebase inizializzata con successo.');
      return true;
    } catch (error) {
      console.error("Errore nell'inizializzazione dell'API Firebase:", error);
      return false;
    }
  }

  /**Metodo che contatta firebase per sapere se le credenziali inserite sono corrette o meno */
  async tryLogin(user: User): Promise<UserCredential | undefined> {
    try {
      const auth = getAuth(this.common_service.fbApp);
      const result = await signInWithEmailAndPassword(
        auth,
        user.username,
        user.password
      );
      // Se tutti ok, chiedo dati utente 
      //TODO: chiedere a FB dati utente 
      return result;
    } catch (error) {
      console.error('Errore durante il tentativo di login:', error);
      return undefined;
    }
  }

  /**Metodo che recupera le credenziali Firebase dell'utente specificato */
  public async getFirebaseConfig(
    username: string
  ): Promise<FirebaseConfig | undefined> {
    try {
      const fbConfig = await this.assets_service.getFile(
        'assets/firebase/fb-proj-configs.json'
      );
      if (!fbConfig) {
        console.error('Impossibile caricare la configurazione Firebase.');
        return;
      }
      const fbUserConfig: FirebaseConfig = fbConfig['users'][username];
      if (!fbUserConfig) {
        console.error(
          `Configurazione Firebase non trovata per l'utente: ${username}`
        );
        return;
      }
      this.common_service.fbUserConfig = fbUserConfig;
      return fbUserConfig;
    } catch (error) {
      console.error(
        'Errore nel recupero della configurazione Firebase:',
        error
      );
      return;
    }
  }

  // #endregion

  // #region service

  /**Metodo che recupera i prodotti di un utente dal real time DB di Firebase */
  async getUserAllowedProducts(
    uid: string
  ): Promise<Record<string, boolean> | null> {
    try {
      console.log(`Recupero prodotti per l'utente: ${uid}`);
      //01. Controlli
      if (!uid) {
        console.error(
          'Nessun nome utente fornito per il recupero dei prodotti.'
        );
        return null;
      }
      if (this.common_service.fbApp == null) {
        console.error('API Firebase non inizializzata.');
        return null;
      }
      //02. Recupero i prodotti dell'utente
      const data = await FirebaseHelper.getData(
        this.common_service.fbApp,
        `users/${uid}/auth/allowedProds`,
        this.common_service.appConfig.firebase.dbUrl || ''
      );
      console.info(`Prodotti recuperati per l'utente ${uid}:`, data);

      return data;
    } catch (error) {
      console.error(
        `Errore nel recupero dei prodotti per l'utente ${uid}:`,
        error
      );
      return null;
    }
  }

  async getUserProducts(uid: string, allowedProds: string[]) {
    try {
      console.info('Recupero prodotti utente...');
      if (!this.common_service.fbApp) {
        console.error('API Firebase non inizializzata.');
        return;
      }
      //02. Recupero i prodotti dell'utente
      const result: any = {};
      const dbUrl = this.common_service.appConfig.firebase.dbUrl || '';
      for (const prodName of allowedProds) {
        if (!this.common_service.fbApp) {
          console.error('API Firebase non inizializzata.');
          return;
        }
        const data = await FirebaseHelper.getData(
          this.common_service.fbApp,
          `sharedLogin/products/${prodName}`,
          this.common_service.appConfig.firebase.dbUrl || ''
        );
        result[prodName] = data;
      }
      console.info(`Prodotti recuperati per l'utente ${uid}:`, result);

      return result;
    } catch (error) {
      console.error("Errore nel recupero dei prodotti dell'utente:", error);
      return [];
    }
  }

  //#endregion
}
