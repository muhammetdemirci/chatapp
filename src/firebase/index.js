
import * as firebase from 'firebase';
import '@firebase/firestore'
import { config } from './config';


const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
};


class FirebaseApi {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        } else {
            console.log("firebase apps already running...")
        }
    }

    async createAccount(username) {

        try {
            const data = await firebase.auth().signInAnonymously()
            if (data) {
                const user_uid = data.user.uid;
                await firebase.database().ref("users").push({
                    uid: user_uid,
                    username: username
                })
                return user_uid;
            }
        } catch (error) {
            console.warn('error on createAccount ', error);
        }

    }

    async getUsers() {
        const snap = await firebase.database().ref('users').once('value');
        var data = [];
        snap.forEach(ss => {
            data.push(ss.val());
        });
        return data;
    }
}

const firebaseApi = new FirebaseApi();
export default firebaseApi;
