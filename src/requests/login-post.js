import axios from 'axios';
import '../interceptors/interceptor';
import { userLogin, updateUser } from '../actions/UserActions/user-action';
import { store } from '../store';
import cookie from 'react-cookies';
import { getUserDetail } from '../containers/get-user-details';

export default (data, instance) => {
  axios.post('http://34.211.76.6:9095/rest/auth/login', {
   email: data.emailId,
   password: data.password
  }).then( function (response) {
       if (response && response.data) {
         cookie.save('token', response.data.data, { path: '/'});
         if(data.password === 'newput123'){
           store.dispatch(userLogin());
           getUserDetail().then(function() {
           instance.history.push('/resetPassword');
           }).catch(function(){});
         } else {
           store.dispatch(userLogin());
           getUserDetail().then(function() {
           instance.history.push('/timesheet');
           }).catch(function(){});
         }
       }
    }).catch(function (error) {
         alert("Error has occured. Plase try again");
         instance.history.push('/login');
    });
};
