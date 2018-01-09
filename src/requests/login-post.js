import axios from 'axios';
import { SubmissionError } from 'redux-form';
import '../interceptors/interceptor';
import { userLogin } from '../actions/UserActions/user-action';
import { store } from '../store';
import cookie from 'react-cookies';
import { getUserDetail } from '../containers/get-user-details';

export default (data, instance) => {
 return axios.post('http://34.211.76.6:9095/rest/auth/login', {
   email: data.emailId,
   password: data.password
  }).then( function (response) {
     if (response && response.data) {
       cookie.save('token', response.data.data, { path: '/', maxAge: 3600 });
       store.dispatch(userLogin());
       getUserDetail().then(function() {
         if(data.password === 'newput123'){
           instance.history.push('/reset-password');
         } else {
            instance.history.push('/timesheet');
         }
       }).catch(function(error){});
     }
   }).catch(function (error) {
       throw new SubmissionError({'_error': 'Invalid username or password' });
   });
};
