import { LOGIN, LOGOUT } from '../actions/constants';

const initialState = {
    user: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, user: action.data };
        case LOGOUT:
            return { ...state, user: null };
        default:
            return state;
    }
}