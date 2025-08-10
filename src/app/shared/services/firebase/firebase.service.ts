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
      console.log(
        'Inizializzazione API Firebase con la configurazione:',
        fbConfig
      );
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
      // Se l'autenticazione va a buon fine, restituisci true
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

async getUserProducts(uid: string): Promise<Record<string, boolean> | null> {
  try {
    console.log(`Recupero prodotti per l'utente: ${uid}`);

    if (!uid) {
      console.error('Nessun nome utente fornito per il recupero dei prodotti.');
      return null;
    }
    if (this.common_service.fbApp == null) {
      console.error('API Firebase non inizializzata.');
      return null;
    }

    const dbUrl = 'https://amedevapps-47624-default-rtdb.europe-west1.firebasedatabase.app';
    const db = getDatabase(this.common_service.fbApp, dbUrl);
    const path = `users/${uid}/allowedProds`;
    const dataRef = ref(db, path);

    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const result = snapshot.val() as Record<string, boolean>;
      console.log('Prodotti recuperati:', result);
      return result;
    } else {
      console.log('Nessun dato trovato per il path:', path);
      return null;
    }
  } catch (error) {
    console.error(`Errore nel recupero dei prodotti per l'utente ${uid}:`, error);
    return null;
  }
}


  //#endregion
}
