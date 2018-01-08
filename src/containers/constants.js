import React from 'react';

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
  <div className='form-group clearfix has-danger'>
    <label className='control-label col-form-label form-control-label'> { label } </label>
    <div className='input-field'>
      <input {...input} placeholder={ label } type={ type } className='form-control form-control-danger' />
    </div>
    { touched && error && <div className='error-msg pull-right text-left'> { error } </div>  }
  </div>
);
