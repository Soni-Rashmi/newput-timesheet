import { USER_LOGIN, USER_LOGOUT, USER_UPDATE } from '../actions/UserActions/user-action';

export default function (state = {}, action) {
    switch (action.type) {
      case USER_LOGIN:
          state['isUserLoggedIn'] = action.isUserLoggedIn;
  		    break;
      case USER_LOGOUT:
          state['isUserLoggedIn'] =  action.isUserLoggedIn;
          state['employee'] = action.employee;
          break;
      case USER_UPDATE:
        state['employee'] = action.employee;
        break;
    }
    return state;
}
