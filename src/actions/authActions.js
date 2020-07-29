import { AUTH } from '../constants/actionTypes';
import firebaseApi from '../firebase';

export function register(username) {
    return dispatch => {

        return firebaseApi.createAccount(username).then(
            res => dispatch({
                type: AUTH.REGISTER_REQ,
                username,
                user_uid: res
            })
        )
    }
}