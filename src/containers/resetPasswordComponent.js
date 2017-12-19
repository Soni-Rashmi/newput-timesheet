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
        <form name='ResetPasswordComponent' className='form form-horizontal' onSubmit={
          handleSubmit((data) => {
            resetPassword(data, this.props);
          })
        }>
          <div className='form-group'>
              <label className='control-label col-sm-4'>New password:</label>
              <div className='col-sm-4'>
                <Field name='password' component='input' type='password' className='form-control' validations={{minLength: 8}} required></Field>
              </div>
          </div>
          <div className='form-group'>
              <label className='control-label col-sm-4'>Confirm password:</label>
              <div className='col-sm-4'>
                <Field name='password1' component='input' type='password' className='form-control' validations={{minLength: 8}} required></Field>
              </div>
          </div>
          <div className='form-group text-center'>
              <button type='submit' className='btn btn-primary'>Reset Password</button>
          </div>
        </form>
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
