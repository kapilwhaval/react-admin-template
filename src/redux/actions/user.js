import { LOGIN, LOGOUT, SET_ACCESS } from './constants';

export const addUser = (accessData) => {
    return (dispatch) => {
        dispatch({ type: LOGIN, data: accessData });
    }
};

export const setAccess = (accessData) => {
    return (dispatch) => {
        dispatch({ type: SET_ACCESS, data: accessData });
    }
};

export const removeUser = () => {
    return (dispatch) => {
        return dispatch({ type: LOGOUT });
    }
};