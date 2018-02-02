export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_UPDATE = 'USER_UPDATE';
export const TOGGLE_NOTIFICATION_IN_USER = 'TOGGLE_NOTIFICATION_IN_USER';
export const ALL_EMPLOYEES_DATA = 'ALL_EMPLOYEES_DATA';

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

export function toggleNotificationInUser(notificationStatus) {
  return {
    type: TOGGLE_NOTIFICATION_IN_USER,
    notificationStatus
  };
}

export function allEployeesData(employeesData){
  return {
    type: ALL_EMPLOYEES_DATA,
    employeesData
  }
}
