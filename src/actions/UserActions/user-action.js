export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_UPDATE = 'USER_UPDATE';

export function userLogin() {
  return {
    type: USER_LOGIN,
    isUserLoggedIn: true
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
    isUserLoggedIn: false,
    employee: null
  };
}

export function updateUser(user) {
  return {
    type: USER_UPDATE,
    employee: user
  };
}
