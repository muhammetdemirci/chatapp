import { AUTH } from '../constants/actionTypes';

export function register(username) {
    return {
        type: AUTH.REGISTER_REQ,
        username,
    }
}