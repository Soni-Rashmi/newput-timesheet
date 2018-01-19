import React, { Component } from 'react';
import { Field, reduxForm, initalize } from 'redux-form';
import { FormGroup, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import queryString from 'query-string';

import { toggleNotificationInUser } from '../actions/UserActions/user-action';
import { store } from '../store';
import { MONTHS, DAYS, getYears } from '../containers/constants';
import Graph from '../containers/graph';
import { getUserDetail } from '../containers/get-user-details';

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
      <select {...input} placeholder={ label } type={ type } className={label === 'Select Employee'? 'form-control employee' : 'form-control' } >
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
    this.showNotification = this.showNotification.bind(this);

    this.state= {
      allEmp : null,
      graphData: null
    }
  }

  showNotification() {
    notificationStatus = !notificationStatus;
    axios.put('http://34.211.76.6:9095/rest/employee/reset/notification', {
      notificationStatus: notificationStatus
    }).then( function (response) {
        store.dispatch(toggleNotificationInUser(notificationStatus));
    }).catch(function (error) {
      store.dispatch(toggleNotificationInUser(!notificationStatus));
    });
  }

  graphView(){
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
   this.props.history.push(`/graph-view?year=${values.year}&month=${values.month}`);
  }

  componentDidMount() {
    if(store.getState().employee && store.getState().employee.employee) {
      empStatus = store.getState().employee.employee.status;
      notificationStatus = store.getState().employee.employee.notificationStatus;
    } else {
      getUserDetail().then(function() {
        empStatus = store.getState().employee.employee.status;
        notificationStatus = store.getState().employee.employee.notificationStatus;
      }).catch(function(){});
    }
    if(empStatus === 'admin'){
      getAllEmployeesDetails(this);
    }
    }

  render() {
    const { handleSubmit, submitting } = this.props;
    return(
      <div className='container-fluid row'>
        <div className='current-month pull-left'> { MONTHS[this.props.month -1] }, {this.props.year} </div>
          <form name='myForm' className='form form-inline filter-wrapper pull-right'
            onSubmit={
              handleSubmit((data) => {
                this.props.triggerUpdateYearAndMonth(data)})
            }>
            {(empStatus === 'admin') ?
              <Field name='employee' component={ renderField } type='text' label='Select Employee'>
                { this.state.allEmp ? getAllEmployeesNames(this.state.allEmp): '' }
              </Field> : ''}
            <Field name='year' component={ renderField } type='text' validate={ required } label='Select Year'>
              { years }
            </Field>
            <Field name='month' component={ renderField } type='text' validate={ required } label='Select Month' >
              { months }
            </Field>
            <div className='form-group'> <button type='submit' disabled={ submitting } className='btn btn-primary'> Search </button></div>
            {(empStatus === 'admin') ?
              <Button bsStyle='info' onClick= { this.graphView }> <span className='fa fa-bar-chart-o'></span>| Graph view </Button>
            : <div className='form-group'><OverlayTrigger
              trigger={[ 'hover', 'focus' ]}
              placement='top'
              overlay={tooltipHoverFocus}>
              <span id ='active' className = { notificationStatus ? 'fa fa-toggle-on fa-3x active pull-right' : 'fa fa-toggle-on fa-3x inactive fa-rotate-180 pull-right'}
                onClick={ this.showNotification } > </span>
            </OverlayTrigger></div> }

          </form>
      </div>
    );
  }
}

function getAllEmployeesDetails(instance) {
 axios.get('http://34.211.76.6:9095/rest/admin/employee').then (function (response) {
    instance.setState({ allEmp: response.data.data });
  }).catch(function (error) { })
}

function getAllEmployeesNames(employees) {
  let users = employees.map(user => {
    return(
      <option key={ user.id } value={ user.id } > { user.fullName } </option>
    );
  });
  return users;
}


TimeFilter =  reduxForm({
  form: 'TimeFilterForm',
  enableReinitialize: true,
  initialValues: {
    year: new Date().getFullYear(),
    month: new Date().getMonth()+1
  }
})(TimeFilter);

export default TimeFilter;
