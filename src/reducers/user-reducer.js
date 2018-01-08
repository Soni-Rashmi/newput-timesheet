import { USER_LOGIN, USER_LOGOUT, USER_UPDATE } from '../actions/UserActions/user-action';

export default function (state = {}, action) {
    switch (action.type) {
      case USER_LOGIN:
          state = {
            ...state,
            'isUserLoggedIn': action.isUserLoggedIn
          }
  		    break;
      case USER_LOGOUT:
          state = {
            ...state,
            'isUserLoggedIn': action.isUserLoggedIn,
            'employee': action.employee
          }
          break;
      case USER_UPDATE:
          state = {
            ...state,
            'employee': action.employee
          }
        break;
    }
    return state;
}
