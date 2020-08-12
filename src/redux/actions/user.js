import { LOGIN, LOGOUT } from './constants';

export const addUser = (userData) => {
    return (dispatch) => {
        return dispatch({ type: LOGIN, data: userData });
    }
};

export const removeUser = () => {
    return (dispatch) => {
        return dispatch({ type: LOGOUT });
    }
};