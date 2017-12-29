import axios from 'axios';
import cookie from 'react-cookies';

axios.interceptors.request.use(function (config) {
  let token = cookie.load('token');
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
