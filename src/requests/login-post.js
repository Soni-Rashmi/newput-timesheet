import axios from 'axios';
import '../interceptors/interceptor';
import { userLogin, updateUser } from '../actions/UserActions/user-action';
import { store } from '../store';

export default (data, instance) => {
   axios.post('http://34.211.76.6:9095/rest/auth/login', {
      email: data.emailId,
      password: data.password
   })
    .then( function (response) {
      if (response && response.data) {
        document.cookie = "'token ="+ response.data.data + ";max-age=3600'";
        getUserDetail();
        store.dispatch(userLogin());
        instance.history.push('/timesheet');
      }
    })
    .catch(function (error) {
        instance.history.push('/login');
    });
};

function getUserDetail() {
    axios.get('http://34.211.76.6:9095/rest/employee/detail')
    .then (function (response) {
        store.dispatch(updateUser(response.data.data));
    }).catch(function (error) {
    });
}
