import axios from 'axios';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if(token != null){
        config.headers['token'] = token;
    }
    config.headers['content-type'] = 'application/json';
    return config;
  }, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
        return Promise.reject(error);
  });
