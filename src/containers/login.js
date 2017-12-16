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
          <div>
            <form className='form form-horizontal' onSubmit={
              handleSubmit((data) => {
                loginAction(data, this.props);
              })
            } >
              <div className='form-group'>
                <label className='control-label col-sm-4'>Email Id:</label>
                <div className='col-sm-6'>
                  <Field name='emailId' component='input' type='email' placeholder='Email Id' className='form-control' />
                </div>
              </div>
              <div className='form-group'>
                <label className='control-label col-sm-4'>Password:</label>
                <div className='col-sm-6'>
                  <Field name='password' component='input' type='password' placeholder='********' className='form-control'/>
                </div>
              </div>
              <div className='col-sm-2  col-sm-offset-4 text-center'>
                <button type='submit' className='btn btn-info'>Log In</button>
              </div>
            </form>
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
