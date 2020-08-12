import axios from 'axios';
import { getConfig } from "../constants/config-handler";
import constants from '../constants';

const api = (method, url, data) => {
    return axios({ method: method, url: `${getConfig().ROOT_URL}${url}`, data: data })
        .then((res) => { return res; })
        .catch((err) => { throw err; });
}

export const login = (data) => {
    return api('post', constants.API.LOGIN, data)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const signUp = (data) => {
    return api('post', constants.API.SIGNUP, data)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const getAllRoles = () => {
    return api('get', constants.API.GET_ALL_ROLES, )
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const getAllModules = () => {
    return api('get', constants.API.GET_ALL_MODULES, )
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const deleteRoles = (ids) => {
    return api('post', constants.API.DELETE_ROLES, ids)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const addRole = (role) => {
    return api('post', constants.API.CREATE_ROLE, role)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const editRole = (data) => {
    return api('put', `${constants.API.EDIT_ROLE}/${data.id}`, data)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}