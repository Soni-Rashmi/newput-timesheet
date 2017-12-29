import axios from 'axios';
import '../interceptors/interceptor';
import { store } from '../store';

export default (data, instance) => {
    if(data.password === data.password1)  {
      if(data.password !== 'newput123'){
        axios.put('http://34.211.76.6:9095/rest/employee/reset/password', {
           password: data.password
        })
         .then( function (response) {
           if (response.data.success) {
             instance.history.push('/timesheet');
           }
         })
         .catch(function (error) {
         });
      } else {
        alert('New password cannot be newput123. Try another');
        instance.history.push('/resetPassword');
      }
    } else {
      alert('Both Password must be same');
      instance.history.push('/resetPassword');
    }
};
