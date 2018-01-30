import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const LOGIN_URL = '/login';
export const TIMESHEET_URL = '/timesheet';
export const RESET_PASSWORD_URL = '/reset-password';

export const LOGIN_API ='http://34.211.76.6:9095/rest/auth/login';
export const RESET_PASSWORD_API = 'http://34.211.76.6:9095/rest/employee/reset/password';
export const TIMESHEET_EMP_API = 'http://34.211.76.6:9095/rest/timesheet';
export const TIMESHEET_ADMIN_API = 'http://34.211.76.6:9095/rest/admin/timesheet';
export const HOURSHEET_API = 'http://34.211.76.6:9095/rest/admin/graph/hoursheet';
export const ALL_EMPLOYEES_DATA_API = 'http://34.211.76.6:9095/rest/admin/employee';
export const EMPLOYEE_DETAIL_API = 'http://34.211.76.6:9095/rest/employee/detail';
export const NOTIFICATION_STATUS_API = 'http://34.211.76.6:9095/rest/employee/reset/notification';
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
