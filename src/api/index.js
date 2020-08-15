import axios from 'axios';
import { getConfig } from "../constants/config-handler";
import constants from '../constants';

const api = (method, url, data) => {
    let config = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmZmYzZmZjc2YTYwMjNmNDhhOTUyNCIsImlhdCI6MTU5NzQyMjU5N30.LAdVyRJnR7AnhiWCxmAlE2s9xXNM7M57DcH5ZJzrQx0' }
    return axios({ method: method, url: `${getConfig().ROOT_URL}${url}`, headers: config, data: data, })
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
    return api('get', constants.API.GET_ALL_ROLES,)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const getAllModules = () => {
    return api('get', constants.API.GET_ALL_MODULES,)
        .then((res) => { return res.data.modules })
        .catch((err) => { throw err; });
}

export const deleteRoles = (ids) => {
    return api('delete', constants.API.DELETE_ROLES, ids)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const addRole = (role) => {
    return api('post', constants.API.CREATE_ROLE, role)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const editRole = (data) => {
    return api('put', `${constants.API.EDIT_ROLE}`, data)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const editUser = (data) => {
    return api('put', `${constants.API.EDIT_USER}`, data)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const getAllUsers = () => {
    return api('get', `${constants.API.GET_USERS}`)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const deleteUsers = (ids) => {
    return api('delete', constants.API.DELETE_USERS, ids)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}