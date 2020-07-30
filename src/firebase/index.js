
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

    get ref() {
        return firebase.database().ref('chats');
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

    async getUsers(user_uid) {
        const snap = await firebase.database().ref('users').once('value');
        const active_chats = await this.getChats(user_uid);

        var data = [];
        // const json = snap.toJSON()
        snap.forEach(ss => {
            // console.warn('ss',ss)
            var isExist = false;
            for (var i = 0; i < active_chats.length; i += 1) {
                if (active_chats[i].username === ss.val().username)
                    isExist = true;
            }
            if (user_uid != ss.key && !isExist)
                data.push({ username: ss.val().username, uid: ss.key });
        });
        console.warn(data)
        return data;
    }

    async send_message(from_uid, from_username, to_uid, to_username, msg, chat_id, image) {
        try {
            if (chat_id) {
                await firebase.database().ref("chats").child(chat_id).push({
                    from_uid, from_username, msg, image,
                    date: moment().unix()
                })
            } else {
                const res = await firebase.database().ref("chats").push({
                    "0": {
                        from_uid, from_username, msg, image,
                        date: moment().unix()
                    }
                })
                console.log('send_message:chat_id', res.key);
                await firebase.database().ref("users").child(from_uid).child("chats").push({
                    chat_id: res.key,
                    username: to_username
                })

                await firebase.database().ref("users").child(to_uid).child("chats").push({
                    chat_id: res.key,
                    username: from_username,
                })

                return res.key;
            }
        } catch (error) {
            console.warn('error on send_message', error);
        }
    }

    async getChats(uid) {
        const snap = await firebase.database().ref('users').child(uid).child("chats").once("value")
        var data = [];
        // const json = snap.toJSON()
        snap.forEach(ss => {
            // console.warn('ss',ss)
            data.push({ username: ss.val().username, chat_id: ss.val().chat_id });
        });
        return data;
    }

    async shareLocation(chat_id,from_username, location) {
        await firebase.database().ref("chats").child(chat_id).push({
            chat_id,from_username, location,
            date: moment().unix()
        })
    }
}

const firebaseApi = new FirebaseApi();
export default firebaseApi;
