import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Field,reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import axios from 'axios';
import moment from 'moment';

import ReactDatePicker from '../components/date-picker';
import ReactMultiSelect from '../components/react-multi-select';
import { goToDashboard, addEntryToTimesheet, sendMail } from './requests';
import {  MONTHS, SEND_MAIL_API, getYears } from './constants';

const years = getYears().map( year => {
    return(
      <option key={ year } value={ year } > { year } </option>
    );
});

const renderInputField = ({ input, label, type, placeholder, meta: { touched, error } }) => (
  <FormGroup className='col-sm-6' validationState={ (touched && error) ? 'error': null  } >
    <label className='control-label col-form-label form-control-label'> { label } </label>
    <div className='input-field'>
      <input {...input} placeholder={ placeholder } type={ type } className='form-control form-control-danger'/>
    </div>
  </FormGroup>
);

const renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
  <FormGroup className='col-sm-6' validationState={ (touched && error) ? 'error': null } >
    <label className='control-label col-form-label form-control-label'> { label } </label>
    <select {...input} placeholder={ label } type={ type } className='form-control'>
      <option id={label}> { label } </option>
      { children }
    </select>
  </FormGroup>
);

const renderTextarea = ({ input, label, type, placeholder, meta: { touched, error } }) => (
  <FormGroup className='col-sm-12' validationState={ (touched && error) ? 'error': null  } >
    <label className='control-label col-form-label form-control-label'> { label } </label>
    <div className='input-field'>
      <textarea {...input} type={ type } className='form-control form-control-danger'/>
    </div>
  </FormGroup>
);

class AddEntryForm extends Component {
  constructor(props) {
    super(props);

    this.handleEntrySubmit = this.handleEntrySubmit.bind(this);
    this.handleMailSubmit = this.handleMailSubmit.bind(this);

    this.state = {
    };
  }

 handleEntrySubmit(data) {
    let self = this;
    addEntryToTimesheet(data).then(response=> {
      self.props.hide();
      goToDashboard(this.props.history);
    }).catch(function (error) {})
  }

  handleMailSubmit(data) {
    let firstDay = moment(new Date (data.year, data.month-1, 1)).format("DD-MM-YYYY");
    let lastDay = moment(new Date(data.year, data.month, 0)).format("DD-MM-YYYY");

    data['startDate'] = firstDay;
    data['endDate'] = lastDay;
    data['month'] = MONTHS[data.month-1];
    let self = this;
    sendMail(data)
    .then(function (response) {
      self.props.hide();
    })
    .catch(function(error) {});

  }

 render() {
    let isAddEntry = this.props.isAddEntry;
    const { touched, error, handleSubmit, submitting } = this.props;
    return (
      <div className='row'>
      {isAddEntry ? <form id='my-form' onSubmit={
        handleSubmit(this.handleEntrySubmit)} className='col-sm-12'>
        <Field name='employee' component={ renderSelectField } type='text' label='Select Employee'>
          { this.props.allEmp ? getAllEmployeesNames(this.props.allEmp): '' }
        </Field>
        <Field
          name='date' maxDate={moment()}
          minDate={moment().subtract(1, 'months').startOf('month')}
          component={ ReactDatePicker } label='Date' placeholder='Select date'>
        </Field>
        <Field name='officeIn' type='text' placeholder='09:00'
          component={ renderInputField } label='Office In'
        />
        <Field name='officeOut' type='text' placeholder='18:30'
          component={ renderInputField } label='Office Out'
        />
        <Field name='homeIn' type='text' placeholder='21:30'
          component={ renderInputField } label='Home In'
        />
        <Field name='homeOut' type='text' placeholder='23:00'
          component={ renderInputField } label='Home Out'
        />
        <div className='modal-footer text-right col-sm-12'>
          <Button bsStyle='primary' disabled={ submitting } type='submit'> Save </Button>
          <Button onClick={this.props.hide} style={{marginLeft: '15px'}}>Close</Button>
        </div>
      </form>
      :
      <form onSubmit={
        handleSubmit(
        this.handleMailSubmit)} className='col-sm-12'>
        <Field name='employee' component={ renderSelectField } type='text' label='Employee'>
          { this.props.allEmp ? getAllEmployeesNames(this.props.allEmp): '' }
        </Field>
        <Field name='subject' type='text' placeholder='subject'
          component={ renderInputField } label='Subject'
        />
        <Field name='year' component={ renderSelectField } type='text' label='Year'>
          { years }
        </Field>
        <Field name='month' component={ renderSelectField } type='text' label='Month'>
          { getMonths() }
        </Field>
        <Field name='toEmailIds' id="to" component={ ReactMultiSelect }  label='To' mutli={true}>
          { getAllNames(this.props) }
        </Field>
        <Field name='ccEmailIds' id="cc" component={ ReactMultiSelect } label='Cc' multi={true}>
          { getAllNames(this.props) }
        </Field>
        <Field name='message' component= {renderTextarea} label='Message' type='text'/>
        { error && <div className='validation-error'> { error } </div> }
        <div className='modal-footer text-right col-sm-12'>
          <Button bsStyle='primary' disabled={ submitting } type='submit'> Send </Button>
          <Button onClick={this.props.hide} style={{marginLeft: '15px'}}>Close</Button>
        </div>
      </form> }
      </div>
    );
  }
}

function getMonths() {
  let months = MONTHS.map(month => {
    return(
      <option key={ month } value={ MONTHS.indexOf(month)+1 } > { month } </option>
    );
  });
  return months;
}

function getAllEmployeesNames(employees) {
  let users = employees.map(user => {
    return(
      <option key={ user.id } value={ user.id } > { user.fullName } </option>
    );
  });
  return users;
}

function getAllNames(props) {
  let allEmp = [];
  props.admins.map(admin => {
    let objData = {
      value: admin.email,
      label: admin.fullName
    }
    allEmp.push(objData)
  });
  props.allEmp.map(user => {
    let objData = {
      value: user.email,
      label: user.fullName
    }
    allEmp.push(objData)
  });
  return allEmp;
}

function validate(values) {
  const errors = {};
  if(!values.date) {
    errors.date = 'Select date';
  }
  if(!values.employee) {
    errors.employee = 'Select an employee';
  }
  if(values.employee === 'Employee') {
    errors.employee = 'Select an employee';
  }
  if(!values.officeIn && !values.homeIn) {
    errors.officeIn = 'Enter officeIn time';
  }

  if(values.officeIn) {
    if(!values.officeOut) {
      errors.officeOut = 'Enter office out time';
    }
  }
  if(values.officeOut) {
    if(!values.officeIn) {
      errors.officeIn = 'Enter office in time';
    }
  }
  if(values.homeIn) {
    if(!values.homeOut) {
      errors.homeOut = 'Enter home out time';
    }
  }
  if(values.homeOut) {
    if(!values.homeIn) {
      errors.homeIn = 'Enter home in time';
    }
  }
  if(values.officeIn && !/^[0-9]{2}:[0-9]{2}$/i.test(values.officeIn)) {
    errors.officeIn = 'Enter time in a valid format';
  }
  if(values.officeOut && !/^[0-9]{2}:[0-9]{2}$/i.test(values.officeOut)) {
    errors.officeOut = 'Enter time in a valid format';
  }
  if(values.homeIn && !/^[0-9]{2}:[0-9]{2}$/i.test(values.homeIn)) {
    errors.homeIn = 'Enter time in a valid format';
  }
  if(values.homeOut && !/^[0-9]{2}:[0-9]{2}$/i.test(values.homeOut)) {
    errors.homeOut = 'Enter time in a valid format';
  }

  if((values.year === new Date().getFullYear() && values.month-1 > new Date().getMonth()) || (values.year === '2017' && values.month-1 < '11')) {
    errors.month = 'No data available for this month';
  }
  if(values.year === 'Year') {
    errors.year = 'No data available for this year';
  }
  if(values.month === 'Month') {
    errors.month = 'No data available for this month';
  }
  if(!values.toEmailIds) {
    errors.toEmailIds = 'Required';
  }
  if(!values.subject) {
    errors.subject = 'Enter subject';
  }
  if(!values.message) {
    errors.message = 'Enter Message';
  }
  return errors;
}

export default withRouter(reduxForm({
  form: 'AddEntry',
  validate,
  enableReinitialize: true,
  initialValues: {
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1
  }
})(AddEntryForm));
