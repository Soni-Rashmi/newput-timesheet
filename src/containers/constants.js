import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const LOGIN_URL = '/login';
export const TIMESHEET_URL = '/timesheet';
export const RESET_PASSWORD_URL = '/reset-password';

const BASE_PATH_URL = 'http://34.211.76.6:9095/rest/'
export const LOGIN_API =`${BASE_PATH_URL}auth/login`;
export const RESET_PASSWORD_API = `${BASE_PATH_URL}employee/reset/password`;
export const TIMESHEET_EMP_API = `${BASE_PATH_URL}timesheet`;
export const TIMESHEET_ADMIN_API = `${BASE_PATH_URL}admin/timesheet`;
export const HOURSHEET_API = `${BASE_PATH_URL}admin/graph/hoursheet`;
export const ALL_EMPLOYEES_DATA_API = `${BASE_PATH_URL}admin/employee`;
export const EMPLOYEE_DETAIL_API = `${BASE_PATH_URL}employee/detail`;
export const NOTIFICATION_STATUS_API = `${BASE_PATH_URL}employee/reset/notification`;
export const ADD_ENTRY_API = `${BASE_PATH_URL}admin/timesheet/entry`;
export const ADMIN_DETAILS_API = `${BASE_PATH_URL}admin`;
export const SEND_MAIL_API = `${BASE_PATH_URL}admin/email/timesheet`;

const startYear = 2017;

export function getYears() {
  let currentYear = new Date().getFullYear();
  let years = [];
  for(let i = startYear; i<= currentYear; i++ ){
    years.push(i);
  }
  return years;
};

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <FormGroup className='clearfix' validationState={ (touched && error) ? 'error': null  }>
    <label className='control-label col-form-label form-control-label'> { label } </label>
    <div className='input-field'>
      <input {...input} placeholder={ label } type={ type } className='form-control form-control-danger' />
    </div>
    { touched && error && <div className='error-msg pull-right text-left'> { error } </div>  }
  </FormGroup>
);

export const XS_SCREEN_WIDTH = '414px';
export const SM_SCREEN_WIDTH = '768px';
export const MD_SCREEN_WIDTH = '1024px';
export const LG_SCREEN_WIDTH = '1440px';

// export const XS_SCREEN_HEIGHT = '736px';
// export const SM_SCREEN_HEIGHT = '768px';
// export const MD_SCREEN_HEIGHT = '800px';
// export const MD_SCREEN_HEIGHT = '900px';
