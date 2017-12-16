import axios from 'axios';
import '../interceptors/interceptor';
import { userLogin } from '../actions/UserActions/user-action';
import { bindActionCreators } from 'redux';
import { store } from '../store';

export default (data, test) => {
   axios.post('http://34.211.76.6:9095/rest/auth/login', {
      email: data.emailId,
      password: data.password
   })
    .then( function (response) {
      if (response && response.data) {
        if (typeof(Storage) !== 'undefined') {
            localStorage.setItem('token', response.data);
            //store.dispatch(userLogin(response.data.data));
            console.log(store);
        }
        else {
            console.log('sorry');
        }
        test.history.push('/timesheet');
      }
    })
    .catch(function (error) {
        test.history.push('/login');
    });
};
