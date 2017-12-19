import axios from 'axios';
import '../interceptors/interceptor';
import { store } from '../store';

export default (data, instance) => {
    if(data.password === data.password1) {
      axios.put('http://34.211.76.6:9095/rest/employee/reset/password', {
         password: data.password
      })
       .then( function (response) {
         if (response) {
           alert("Password updated");
           instance.history.push('/login');
         }
       })
       .catch(function (error) {
       });
    } else {
      alert('Both Password should match');
      instance.history.push('/resetPassword');
    }
};
