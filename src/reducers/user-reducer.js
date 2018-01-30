import { USER_LOGIN, USER_LOGOUT, USER_UPDATE, TOGGLE_NOTIFICATION_IN_USER, VIEW_MODE_FOR_ADMIN } from '../actions/UserActions/user-action';

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
      case TOGGLE_NOTIFICATION_IN_USER:
          state = {
            ...state,
            'employee': {
                ...state.employee,
                'notificationStatus': action.notificationStatus
            }
          }
        break;
    }
    return state;
}
