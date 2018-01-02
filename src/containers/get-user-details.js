import axios from 'axios';
import '../interceptors/interceptor';
import { updateUser } from '../actions/UserActions/user-action';
import { store } from '../store';

export function getUserDetail() {
  return axios.get('http://34.211.76.6:9095/rest/employee/detail')
    .then (function (response) {
        store.dispatch(updateUser(response.data.data));
    }).catch(function (error) {});
}
