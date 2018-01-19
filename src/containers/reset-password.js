import axios from 'axios';
import '../interceptors/interceptor';
import { store } from '../store';

export default (data, instance) => {
  return axios.put('http://34.211.76.6:9095/rest/employee/reset/password', {
   password: data.password
  }).then( function (response) {
    let emp_id = store.getState().employee.employee.id;
     instance.history.push(`/timesheet?year=${new Date().getFullYear()}&month=${new Date().getMonth()+1}&emp_id=${emp_id}`);
   }).catch(function (error) {});
};
