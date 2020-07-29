
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
        return new Promise((resolve, reject) => {
            firebase.auth()
                .signInAnonymously().then((data) => {
                    const user_uid = data.user.uid
                    console.warn("user", user_uid)
                    firebase.database().ref("users").push({
                        uid: user_uid,
                        username: username
                    }).then(() => {
                        console.warn('collection succesfully done')
                    }).catch((error) => {
                        console.warn(" collection error ", error)
                    })
                }).then(() => {
                    console.warn('succesfully done')
                }).catch((error) => {
                    console.warn("error ", error)
                })

        });
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
