import { AUTH } from '../constants/actionTypes';

const initialState = {
    username: '',
    is_user_logged_in: false,
    user_uid: '',
}

const redObj = {
    [AUTH.REGISTER_REQ]: (state, action) => {
        return Object.assign({}, state, {
            username: action.username,
            user_uid: action.user_uid,
            is_user_logged_in: true,
        });
    }
}

export default function auth(state = initialState, action) {
    const executor = redObj[action.type];
    if (!executor) return state;
    return executor(state, action);
}