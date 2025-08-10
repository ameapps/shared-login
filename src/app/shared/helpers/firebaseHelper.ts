import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, Database, push, child, update } from "firebase/database";
import { ObjectHelper } from '../../../../../../Ionic/SportTracker/src/helpers/ObjectHelper';

/**
 * Class allowing to access firebase database. 
 * It permits to read and write data into it.
 */
export class FirebaseHelper {

    //#region get data from firebase database object

    /**
     * https://firebase.google.com/docs/database/web/read-and-write?authuser=0
     * Method getting the specified object from the firebase database
     * using the credentials object.
     * EXAMPLE: 
     *          firebaseConfig = const firebaseConfig = 
     *                      {
     *                          apiKey: "apiKey",
     *                          authDomain: "authDomain.firebaseapp.com",
     *                          databaseURL: "https://urlstring",
     *                          projectId: "projectId",
     *                          storageBucket: "storageBucket",
     *                          messagingSenderId: "messagingSenderId",
     *                          appId: "appId",
     *                          measurementId: "measurementId"
     *                      };
     *  path = 'object name';
     *  var result = {result object}
     * @param credentials object including the firebase credentials.
     * @param path string representing the desired path name.
     * @returns the element located in the firebase database.
     */
    static async getData(credentials: any, path: any) {
        const app: FirebaseApp = initializeApp(credentials as FirebaseOptions);
        const db: Database = getDatabase(app);
        return await FirebaseHelper.getDbData(db, path);

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

    //#endregion

    /**
     * https://firebase.google.com/docs/database/web/read-and-write?authuser=0
     * Method to write the specified object to the specified 
     * database object name. 
     * NOTE: firebase rule MUST allow writing to the database. 
     * NOTE: this method will REPLACE the object located at the 
     * specified path. All data of the replaced object will be 
     * lost.
     * EXAMPLE: 
     *      FirebaseHelper.writeUserData(arr, credentials, 'photoes');
     * @param objToUpload object to upload replacing the existing one. 
     * @param credentials object including the firebase credentials.
     * @param path string representing the desired path name.
     */
    static writeUserData(objToUpload: any, credentials: any, path: any) {
        const app = initializeApp(credentials as FirebaseOptions);
        const db = getDatabase(app);
        set(ref(db, path), objToUpload);
    }

    /**
     * TODO: fare un metodo per aggiunerere un oggetto 
     * senza dover scaricare tutto l'array, aggiungerlo li
     * e farne ancora l'upload con l'elemento aggiunto
     */

    /**
     * Method allowind to add an element to a firebase realtime database
     * object. This method precisely allows to push an element 
     * avoiding to have to rewrite a new object. 
     * Firebase does NOT allow to use an array but just object.
     * Arrays must so be implemented as dictionaries.
     * @param savedImageFile 
     * @param credentials 
     * @param key 
     * @returns 
     */
    static async pushToChild(savedImageFile: object, credentials: any, key: string) {
        try {
            const app = initializeApp(credentials as FirebaseOptions);
            const db = getDatabase(app);
    
            // Get a key for a new Post.
            const newPostKey = await FirebaseHelper.getPostKey(db, 'NUMBER', key);
            // Write the new post's data simultaneously in the posts list and the user's post list.
            const updates: { [key: string]: any } = {};
            updates[key + '/' + newPostKey] = savedImageFile;
            
            return update(ref(db), updates);
        } catch (error) {
            console.error(error)
        }
    }

    //#region get object key
    private static async getPostKey(db: Database, postKeyType: string, key: string) {
        let postKey: string = '';

        switch (postKeyType) {
            case 'NUMBER':
                postKey = await this.getNumber(db, key);
                break;
            case 'RANDOM':
                postKey = push(child(ref(db), key)).key
                break;
        
            default:
                break;
        }

        return postKey;
    }

    static async getNumber(db: Database, key: string): Promise<string> {
        const dbObj = await FirebaseHelper.getDbData(db, key);
        const fieldNumber = ObjectHelper.objectFieldsNumber(dbObj) +1;
        return fieldNumber + '';
    }

    //#endregion


    /**
     * TODO: fare l'aggiornamento di un oggetto sul database.
     * (evitando quanto speigato nell'altro todo)
     */

}