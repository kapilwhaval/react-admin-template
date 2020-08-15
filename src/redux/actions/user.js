import { LOGIN, LOGOUT } from './constants';

export const addUser = (accessData) => {
    return (dispatch) => {
        dispatch({ type: LOGIN, data: accessData });
    }
};

export const removeUser = () => {
    return (dispatch) => {
        return dispatch({ type: LOGOUT });
    }
};