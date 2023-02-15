import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const getUserList = () => {
    return axios.get(`${BASE_URL}/api/user/`);
}

export const getOneUser = (id) => {
    return axios.get(`${BASE_URL}/api/user/${id}`);
}

export const createUser = (user) => {
    return axios.post(`${BASE_URL}/api/user/`, user);
}

export const updateUser = (id, user) => {
    return axios.put(`${BASE_URL}/api/user/${id}`, user);
}

export const removeUser = (id) => {
    return axios.delete(`${BASE_URL}/api/user/${id}`);
}

export const login = (email, password) => {
    return axios.post(`${BASE_URL}/api/user/login/`, {email, password})
}

export const register = (user) => {
    console.log(user);
    return axios.post(`${BASE_URL}/api/user/register/`, user);
}
