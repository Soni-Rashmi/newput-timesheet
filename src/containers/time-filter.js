import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormGroup } from 'react-bootstrap';
import axios from 'axios';

import { store } from '../store';
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
const required = value => value ? (value === 'Select Year' || value === 'Select Month' ) ? 'Required': ''  : 'Required';

const renderField = ({ input, label, type, meta: { touched, error }, children }) => (
  <FormGroup validationState={ (touched && error) ? 'error': null  }>
      <select {...input} placeholder={ label } type={ type } className='form-control'>
        <option > { label } </option>
        { children }
      </select>
  </FormGroup>
);

class TimeFilter extends Component {
  constructor(props) {
    super(props);
    this.state= {
      allEmp : null
    }
  }

  componentDidMount() {
    if(store.getState().employee.employee.status === 'admin'){
      getAllEmployeesDetails(this);
    }
  }

  render(){
    const { handleSubmit } = this.props;
    const emp = store.getState().employee.employee;

    return(
      <div className="container-fluid row">
        <div className='current-month pull-left'> { MONTHS[this.props.month-1]} {this.props.year} </div>
        <form className='form form-inline filter-wrapper pull-right' onSubmit={
          handleSubmit((data) => {
            this.props.triggerUpdateYearAndMonth(data)})
          }>
          {(emp && emp.status === 'admin') ?
            <Field name='employee' component={ renderField } type='text' label='Select Employee' >
              { this.state.allEmp ? getAllEmployees(this.state.allEmp): '' }
            </Field>
          : ''}
            <Field name='year' component={ renderField } type='text' validate={ required } label='Select Year' >
              { years }
            </Field>
            <Field name='month' component={ renderField } type='text' label='Select Month' validate={ required }  >
              { months }
            </Field>
          <button type='submit' className='btn btn-primary'> Search </button>
        </form>
      </div>
    );
  }
}

function getAllEmployeesDetails(instance) {
 axios.get('http://34.211.76.6:9095/rest/admin/employee')
  .then (function (response) {
    instance.setState({allEmp: response.data.data });
})
  .catch(function (error) { });
}

function getAllEmployees(employees) {
  let users = employees.map(user => {
    return(
      <option key={ user.id } value={ user.id }> { user.fullName } </option>
    );
  });
  return users
}

TimeFilter =  reduxForm({
  form: 'TimeFilter',
  initialValues: {
        month: MONTHS[new Date().getMonth()],
        year: new Date().getFullYear()
  }
})(TimeFilter);

export default TimeFilter;
