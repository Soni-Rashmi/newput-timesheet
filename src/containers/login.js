import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import loginAction from '../requests/login-post';

class LogIn extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { handleSubmit } = this.props;
        return (
          <div className='col-sm-offset-3  col-sm-6 col-lg-4 col-lg-offset-4'>
          <div className='login-form-wrapper'>
            <p>Sign In </p>
            <form name='loginForm' className='' onSubmit={
              handleSubmit((data) => {
                loginAction(data, this.props);
              })
            } >
              <div className='form-group'>
                <label className='control-label'>Email Id:</label>
                <div className='input-field'>
                  <Field name='emailId' component='input' type='email' placeholder='Email Id' className='form-control'  validations="isEmail" required/>
                </div>
              </div>
              <div className='form-group'>
                <label className='control-label'>Password:</label>
                <div className='input-field'>
                  <Field name='password' component='input' type='password' placeholder='********' className='form-control' required/>
                </div>
              </div>
              <div className='text-center'>
                <button type='submit' className='btn btn-primary'>Log In</button>
              </div>
            </form>
          </div>
          </div>
        );
    }
}

LogIn =  reduxForm({
  form: 'LogIn'
})(LogIn);

const selector = formValueSelector('LogIn');
connect(
  state => {
    emailId: selector(state, 'emailId')
    password: selector(state, 'password')
    return {
        emailId,
        password
    }
  }
)(LogIn);

export default LogIn;
