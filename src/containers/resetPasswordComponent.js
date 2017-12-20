import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import resetPassword  from '../containers/resetPassword';

class ResetPasswordComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      const { handleSubmit } = this.props;
      return(
        <div className='col-sm-offset-4 col-sm-4 col-xs-12'>
          <div className='resetPassword-form-wrapper'>
            <p>Reset Password </p>
            <form name='ResetPasswordComponent' className='form form-horizontal' onSubmit={
              handleSubmit((data) => {
                resetPassword(data, this.props);
              })
            }>
              <div className='form-group'>
                  <label className='control-label'>New password:</label>
                  <div className='input-field'>
                    <Field name='password' component='input' type='password' className='form-control' required></Field>
                  </div>
              </div>
              <div className='form-group'>
                  <label className='control-label'>Confirm password:</label>
                  <div className='input-field'>
                    <Field name='password1' component='input' type='password' className='form-control' required></Field>
                  </div>
              </div>
              <div className='form-group text-center'>
                  <button type='submit' className='btn btn-primary'>Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      );

    }
}

ResetPasswordComponent =  reduxForm({
  form: 'ResetPasswordComponent'
})(ResetPasswordComponent);

const selector = formValueSelector('ResetPasswordComponent');
connect(
  state => {
      password= selector(state, 'password')
  }
)(ResetPasswordComponent);

export default ResetPasswordComponent;
