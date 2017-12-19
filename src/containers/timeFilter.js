import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

const months = ['Jan', 'Feb', 'Mar', 'Apr'];

class TimeFilter extends Component {
    render() {
        return(
            <div className='filter-wrapper'>
                <form className='form form-inline'>
                  <div className='form-group select-month'>
                      <Field name='month' component='select' type='input'className='form-control'>
                          <option>Select Month</option>
                          <option>January </option>
                          <option>Feb </option>
                      </Field>
                  </div>
                  <div className='form-group select-year'>
                      <Field name='month' component='select' type='input'className='form-control'>
                          <option >Select Year</option>
                          <option value='1'>2017</option>
                          <option value='2'>2018</option>
                          <option value='3'>2019</option>
                      </Field>
                  </div>
                      <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        );
    }
}

TimeFilter =  reduxForm({
  form: 'TimeFilter'
})(TimeFilter);

const selector = formValueSelector('TimeFilter');
connect(
  state => {

  }
)(TimeFilter);

export default TimeFilter;
