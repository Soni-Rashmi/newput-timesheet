import axios from 'axios';
import '../interceptors/interceptor';
import { store } from '../store';

export default (data, instance) => {
  return axios.put('http://34.211.76.6:9095/rest/employee/reset/password', {
   password: data.password
  }).then( function (response) {
     instance.history.push('/timesheet');
   }).catch(function (error) {});
};
