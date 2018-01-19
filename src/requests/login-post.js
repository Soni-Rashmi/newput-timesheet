import axios from 'axios';
import { SubmissionError } from 'redux-form';
import cookie from 'react-cookies';

import { userLogin } from '../actions/UserActions/user-action';
import { store } from '../store';
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
        let emp_id = store.getState().employee.employee.id;
        let url;
         if(data.password === 'newput123'){
           url= '/reset-password';
         } else {
            url = `/timesheet?year=${new Date().getFullYear()}&month=${new Date().getMonth()+1}&emp_id=${emp_id}`;
         }
         instance.history.push(url);
       }).catch(function(error){});
     }
   }).catch(function (error) {
       throw new SubmissionError({'_error': 'Invalid username or password' });
   });
};
