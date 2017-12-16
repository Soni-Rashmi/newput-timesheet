import { USER_LOGIN, USER_LOGOUT, USER_UPDATE } from '../actions/UserActions/user-action';

export default function (state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      state['employee'] = action.employee;
		break;
    case USER_LOGOUT:
      state['employee'] = action.employee;
      break;
    case USER_UPDATE:
      state['user'] = action.user;
    break;
    default:
    return state;
  }
  return state;
}
