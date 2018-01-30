import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import {Field, reduxForm } from 'redux-form';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import { getAllEmployeesDetails, goToDashboard } from '../containers/requests';
import { toggleNotificationInUser } from '../actions/UserActions/user-action';
import { store } from '../store';
import { MONTHS, DAYS, getYears, NOTIFICATION_STATUS_API } from '../containers/constants';

const months = MONTHS.map( month => {
    return(
      <option key={ month } value={ MONTHS.indexOf(month)+1 } > { month } </option>
    );
});

const years = getYears().map( year => {
    return(
      <option key={ year } value={ year } > { year } </option>
    );
});

const required = value => value ? (value === 'Select Year' || value === 'Select Month' ) ? 'Required': ''  : 'Required';

const renderField = ({ input, label, type, meta: { touched, error }, children }) => (
  <FormGroup validationState={ (touched && error) ? 'error': null } >
      <select {...input} placeholder={ label } type={ type } className={label === 'Select Employee'? 'form-control employee' : 'form-control' }  disabled={label === 'Select Employee' && cookie.load('viewMode') === 'graph'? 'true' : false}>
        <option> { label } </option>
        { children }
      </select>
  </FormGroup>
);

const tooltipHoverFocus = (
	<Tooltip id='popover-trigger-hover-focus'>
		Slack notification
	</Tooltip>
);

let year, month, emp_id, notificationStatus, empStatus;

class TimeFilter extends Component {
  constructor(props) {
    super(props);
    this.graphView = this.graphView.bind(this);
    this.updateNotificationStatus = this.updateNotificationStatus.bind(this);
    this.changeViewMode = this.changeViewMode.bind(this);

    this.state= {
      allEmp : null,
      graphData: null
    }
  }

  changeViewMode () {
    cookie.save('viewMode', 'table', {path: '/', maxAge: 3600});
    $('.table-view-button').css('background-color', '#337ab7');
    $('.graph-view-button').css('background-color', '#31B0D5');
  }

  graphView(){
    cookie.save('viewMode', 'graph', {path: '/', maxAge: 3600});
    $('.table-view-button').css('background-color', '#31B0D5');
    $('.graph-view-button').css('background-color', '#337ab7');
    let formData= store.getState().form.TimeFilterForm.values;
    let values;
    if(formData && formData.year && formData.month){
      if(!(formData.year === 'Select Year') && !(formData.month === 'Select Month')) {
        values = {
          year: formData.year,
          month: formData.month
        }
      } else {
        values = {
          year: new Date().getFullYear(),
          month: new Date().getMonth()+1
        }
      }
    } else {
      values = {
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1
      }
    }
    this.props.triggerUpdateYearAndMonth(values);
  }

  componentDidMount() {
    empStatus = this.props.empStatus;
    notificationStatus = this.props.notificationStatus;
    if(empStatus === 'admin'){
      getAllEmployeesDetails(this);
    }
  }

  updateNotificationStatus() {
    notificationStatus = !notificationStatus;
    axios.put(NOTIFICATION_STATUS_API, {
      notificationStatus: notificationStatus
    }).then(function(response) {
      store.dispatch(toggleNotificationInUser(notificationStatus));
    }).catch(function() {
      store.dispatch(toggleNotificationInUser(!notificationStatus));
    })
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return(
      <div className='col-md-3 col-lg-2 filter-wrapper'>
        {empStatus === 'admin' ? <a onClick={ goToDashboard } href='timesheet?year=2018&month=1'>Back </a> : ''}
        <div className='current-month'> { MONTHS[this.props.month -1] }, {this.props.year} </div>
          <form name='myForm' className='form'
            onSubmit={
              handleSubmit((data) => {
                this.props.triggerUpdateYearAndMonth(data)})
          }>
          {(empStatus === 'admin') ?
              <Field name='employee' component={ renderField } type='text' label='Select Employee'>
                { this.state.allEmp ? getAllEmployeesNames(this.state.allEmp): '' }
              </Field> : ''}
            {(empStatus === 'employee') ? <div>
            <p className='notification-status'>Notification :</p>
            <OverlayTrigger
              trigger={[ 'hover', 'focus' ]}
              placement='top'
              overlay={tooltipHoverFocus}>
              <span className = {notificationStatus ? 'fa fa-toggle-on fa-3x active' : 'fa fa-toggle-on fa-3x inactive fa-rotate-180'}
                onClick={ this.updateNotificationStatus } ></span>
            </OverlayTrigger></div> :''}
            <Field name='year' component={ renderField }  validate={ required } label='Select Year'>
              { years }
            </Field>
            <Field name='month' component={ renderField } validate={ required } label='Select Month' >
              { months }
            </Field>
            <div className='form-group'> <Button type='submit' disabled={ submitting } bsStyle='info' className='table-view-button' onClick= { (empStatus === 'admin') ? this.changeViewMode  : null}> Table View</Button></div>
            {(empStatus === 'admin')  ?
              <Button bsStyle='info' onClick= { this.graphView } className='graph-view-button'> <span className='fa fa-bar-chart-o'></span>| Graph view </Button>
            : '' }
          </form>
      </div>
    );
  }
}

function getAllEmployeesNames(employees) {
  let users = employees.map(user => {
    return(
      <option key={ user.id } value={ user.id } > { user.fullName } </option>
    );
  });
  return users;
}

function mapStateToProps(state){
  return {
    empStatus: state.employee.employee.status,
    notificationStatus: state.employee.employee.notificationStatus
  };
}

TimeFilter =  reduxForm({
  form: 'TimeFilterForm',
  enableReinitialize: true,
  initialValues: {
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1
  }
})(TimeFilter);

export default connect(mapStateToProps)(TimeFilter);
