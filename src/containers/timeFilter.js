import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { MONTHS, DAYS, getYears } from '../containers/constants';
import { store } from '../store';

const months = MONTHS.map( month => {
    return(
      <option key={ month } value={MONTHS.indexOf(month)+ 1}> { month } </option>
    );
});

const years = getYears().map( year => {
    return(
      <option key={ year } value={ year }> { year } </option>
    );
});

class TimeFilter extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        const { handleSubmit } = this.props;
        return(
            <div className=" container-fluid row">
                <div className='current-month pull-left'>{MONTHS[this.props.month-1]} {this.props.year}</div>
                <form className='form form-inline filter-wrapper pull-right' onSubmit={
                  handleSubmit((data) => {
                    this.props.triggerUpdateYearAndMonth(data, this.props)
                  })}>
                  <div className='form-group select-year'>
                      <Field name='year' component='select' type='input' className='form-control'>
                          <option >Select Year</option>
                          { years }
                      </Field>
                  </div>
                  <div className='form-group select-month'>
                      <Field name='month' component='select' type='input'className='form-control'>
                          <option>Select Month</option>
                          { months }
                      </Field>
                  </div>
                  <button type='submit' className='btn btn-primary'>Search</button>
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
    year: selector(state, 'year')
    month: selector(state, 'month')
    return {
        year,
        month
    }
  }
)(TimeFilter);


export default TimeFilter;
