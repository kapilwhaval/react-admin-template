import { LOGIN, LOGOUT } from '../actions/constants';

const initialState = {
    user: null,
    access_modules: [],
    all_modules: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.data.user,
                access_modules: action.data.access_modules,
                all_modules: action.data.all_modules
            };
        case LOGOUT:
            return { ...state, user: null };
        default:
            return state;
    }
}