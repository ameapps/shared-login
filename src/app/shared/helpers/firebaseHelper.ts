import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  get,
  set,
  push,
  child,
  update,
  Database,
  onValue,
} from 'firebase/database';
import { getApps } from 'firebase/app';

export class FirebaseHelper {
  private static apps: Map<string, FirebaseApp> = new Map();

  /** Legge dati da un percorso del DB */
  static async getData(app: FirebaseApp, path: string): Promise<any> {
    const db: Database = getDatabase(app);
    const dbData = await FirebaseHelper.getDbData(db, path);
    return dbData;
  }

  /**Method getting the data available at the specified path using the specified database. */
  private static async getDbData(db: Database, path: any) {
    const starCountRef = ref(db, path);
    const prom = new Promise((resolve, reject) => {
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      });
    });
    return prom;
  }

  /** Scrive un oggetto sostituendo quello esistente */
  static async writeUserData(
    objToUpload: object,
    app: FirebaseApp,
    path: string
  ): Promise<void> {
    const db = getDatabase(app);
    await set(ref(db, path), objToUpload);
  }

  /**
   * Aggiunge un elemento a un nodo senza sovrascrivere tutto
   * (senza dipendere da altri metodi interni)
   */
  static async pushToChild(
    data: Record<string, unknown>,
    credentials: FirebaseOptions,
    path: string,
    postKeyType: 'NUMBER' | 'RANDOM' = 'RANDOM'
  ): Promise<void> {
    try {
      const app = initializeApp(credentials);
      const db = getDatabase(app);

      let newKey: string | null = null;

      if (postKeyType === 'RANDOM') {
        // Genera chiave casuale
        newKey = push(ref(db, path)).key;
      } else if (postKeyType === 'NUMBER') {
        // Genera chiave numerica sequenziale
        const snapshot = await get(ref(db, path));
        const currentData = snapshot.exists() ? snapshot.val() : {};
        const nextNumber = Object.keys(currentData).length + 1;
        newKey = String(nextNumber);
      }

      if (!newKey) {
        throw new Error('Impossibile generare una nuova chiave.');
      }

      // Aggiorna solo il nodo specifico
      const updates: Record<string, unknown> = {
        [`${path}/${newKey}`]: data,
      };

      await update(ref(db), updates);
      console.log(`Elemento aggiunto a "${path}" con chiave "${newKey}"`);
    } catch (error) {
      console.error(`Errore in pushToChild(${path}):`, error);
      throw error;
    }
  }
}
