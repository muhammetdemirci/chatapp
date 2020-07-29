
import * as firebase from 'firebase';
import '@firebase/firestore'
import { config } from './config';
import moment from 'moment';

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
                const res = await firebase.database().ref("users").push({
                    username: username,
                    chats: []
                })
                return res.key;
            }
        } catch (error) {
            console.warn('error on createAccount ', error);
        }

    }

    async getUsers() {
        const snap = await firebase.database().ref('users').once('value');
        var data = [];
        // const json = snap.toJSON()
        snap.forEach(ss => {
            // console.warn('ss',ss)
            data.push({ username: ss.val().username, uid: ss.key });
        });
        return data;
    }

    async send_message(from_uid, from_username, to_uid, to_username, msg, key) {
        try {
            if (key) {
                // console.warn(key, key._W)
                await firebase.database().ref("chats").child(key).push({
                    from_uid, from_username, to_uid, to_username, msg,
                    date: moment().unix()
                })
            } else {
                const res = await firebase.database().ref("chats").push({
                    "0": {
                        from_uid, from_username, to_uid, to_username, msg,
                        date: moment().unix()
                    }
                })
                await firebase.database().ref("users").child(from_uid).child("chats").push({
                    to_username
                })

                await firebase.database().ref("users").child(to_uid).child("chats").push({
                    from_username
                })

                return res.key;
            }
        } catch (error) {
            console.warn('error on send_message', error);
        }
    }
}

const firebaseApi = new FirebaseApi();
export default firebaseApi;
