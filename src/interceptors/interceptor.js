import axios from 'axios';

axios.interceptors.request.use(function (config) {
    const token = (document.cookie).split('=')[1];
    if(token){
        config.headers['token'] = token;
    }
    config.headers['content-type'] = 'application/json';
    return config;
  }, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
        return Promise.reject(error);
});
