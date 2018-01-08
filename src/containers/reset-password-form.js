import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import resetPassword  from '../containers/reset-password';
import { renderField } from '../containers/constants';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    return resetPassword(values, this.props);
  }

  render() {
    const {  handleSubmit, submitting } = this.props;
    return(
      <div className='col-sm-offset-3  col-sm-6 col-lg-4 col-lg-offset-4'>
        <div className='resetPassword-form-wrapper'>
          <p>Reset Password </p>
          <form  onSubmit={
            handleSubmit( this.submit) } >
            <Field name='password' type='password' id='password'
              component={ renderField }  label='New Password'
            />
            <Field name='confirmPassword' type='password'
              component={ renderField } label='Confirm Password'
            />
            <div className='text-center'>
              <button type='submit' disabled={ submitting } className='btn btn-primary'> Reset Password </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


function validate(values) {
  const errors = {};

  if(!values.password) {
    errors.password = 'Fill this field !!';
  } else if(values.password.length < 7){
    errors.password = 'Password must be at least 7 characters long !!';
  }
  if(!values.confirmPassword) {
    errors.confirmPassword = 'Fill this field !!';
  } else if(values.confirmPassword.length < 7){
      errors.confirmPassword = 'Password must be at least 7 characters long !!';
  }

  if(values.password === 'newput123') {
    errors.password = 'Default password is not allowed. Please try another !!'
  }
  if(values.confirmPassword === 'newput123') {
    errors.confirmPassword = 'Default password is not allowed. Please try another !!'
  }
  if(values.confirmPassword && (values.confirmPassword !== values.password)) {
    errors.confirmPassword = 'Both password must match !!';
  }
  return errors;
}

export default reduxForm({
  form: 'ResetPasswordValidation',
  validate
})(ResetPasswordForm);
