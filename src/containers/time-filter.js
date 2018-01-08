import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormGroup } from 'react-bootstrap';

import { MONTHS, DAYS, getYears } from '../containers/constants';

const months = MONTHS.map( month => {
    return(
      <option key={ month } value={MONTHS.indexOf(month)+ 1} > { month } </option>
    );
});

const years = getYears().map( year => {
    return(
      <option key={ year } value={ year }> { year } </option>
    );
});

const required = value => value ? (value === 'Select Year' || value === 'Select Month') ? 'Required': ''  : 'Required';

const renderField = ({ input, label, type, meta: { touched, error }, children }) => (
  <FormGroup validationState={ (touched && error) ? 'error': null  }>
      <select {...input} placeholder={ label } type={ type } className='form-control' >
        <option> { label } </option>
        { children }
      </select>
  </FormGroup>
);

class TimeFilter extends Component {
    render(){
      const { handleSubmit } = this.props;
      return(
        <div className="container-fluid row">
          <div className='current-month pull-left'> { MONTHS[this.props.month-1]} {this.props.year} </div>
          <form className='form form-inline filter-wrapper pull-right' onSubmit={
            handleSubmit((data) => {
              this.props.triggerUpdateYearAndMonth(data)})
            }>
              <Field name='year' component={ renderField } type='text' validate={ required } label='Select Year' >
                { years }
              </Field>
              <Field name='month' component={ renderField } type='text' label='Select Month' validate={ required } >
                { months }
              </Field>
            <button type='submit' className='btn btn-primary'>Search</button>
          </form>
        </div>
      );
    }
}

TimeFilter =  reduxForm({
  form: 'TimeFilter'
})(TimeFilter);

export default TimeFilter;
