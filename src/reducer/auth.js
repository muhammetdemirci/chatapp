import { AUTH } from '../constants/actionTypes';

const initialState = {
    username: '',
    is_user_logged_in: false
}

const redObj = {
    [AUTH.REGISTER_REQ]: (state, action) => {
        console.warn('action', action.username)
        return Object.assign({}, state, {
            username: action.username,
            is_user_logged_in: true,
        });
    }
}

export default function auth(state = initialState, action) {
    const executor = redObj[action.type];
    if (!executor) return state;
    return executor(state, action);
}