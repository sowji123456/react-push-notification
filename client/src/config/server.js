import axios from "axios";

axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
}); 

export const apiCalls = {
    post: (url,body) =>{
        return axios.post(url,body);
    }
}