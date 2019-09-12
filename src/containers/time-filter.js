import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import cookie from 'react-cookies';

import { Field, reduxForm } from 'redux-form';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Modal from 'react-bootstrap/lib/Modal';

import { getAllEmployeesDetails, goToDashboard, getAdminDetails } from '../containers/requests';
import { toggleNotificationInUser } from '../actions/UserActions/user-action';
import { store } from '../store';
import { MONTHS, DAYS, getYears, NOTIFICATION_STATUS_API, TIMESHEET_URL } from '../containers/constants';
import AddEntryForm from './add-entry';

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
    <select {...input} placeholder={ label } type={ type } className={label === 'Select Employee'? 'form-control employee' : 'form-control' }  style={((label === 'Select Employee') && (cookie.load('viewMode') === 'graph'))? {display:'none'} : {display:'block'}} >
      <option id={label}> { label } </option>
      { children }
    </select>
  </FormGroup>
);

const tooltipHoverFocus = (
	<Tooltip id='popover-trigger-hover-focus'>
		Slack notification
	</Tooltip>
);

let year, month, empId, notificationStatus, empStatus;
let url = `${TIMESHEET_URL}?year=${new Date().getFullYear()}&month=${new Date().getMonth()+1}`;


class TimeFilter extends Component {
  constructor(props) {
    super(props);
    this.graphView = this.graphView.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.showModalToSendMail = this.showModalToSendMail.bind(this);
    this.updateNotificationStatus = this.updateNotificationStatus.bind(this);
    this.changeViewMode = this.changeViewMode.bind(this);

    this.state= {
      graphData: null,
      show: false,
      isAddEntry: false,
      admins: []
    }
  }
  handleFormSubmit(data){
    this.setState({show: false})
  }
  changeViewMode () {
    cookie.save('viewMode', 'table', {path: '/', maxAge: 3600});
  }

  graphView(){
    cookie.save('viewMode', 'graph', {path: '/', maxAge: 3600});
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
    empId = this.props.empId;
    if(empStatus === 'admin'){
      getAllEmployeesDetails(this);
    }
  }

  updateNotificationStatus() {
    notificationStatus= !notificationStatus
    axios.put(NOTIFICATION_STATUS_API, {
      notificationStatus: notificationStatus
    }).then(function(response) {
      store.dispatch(toggleNotificationInUser(notificationStatus));
    }).catch(function() {
      store.dispatch(toggleNotificationInUser(!notificationStatus));
    });
  }
  showModal() {
    this.setState({isAddEntry:true, show: true});
  }
  showModalToSendMail() {
      getAdminDetails().then((response) => {
        this.setState({isAddEntry:false, show: true, admins: response.data});
      }).catch(function() {});
  }
  handleHide() {
    this.setState({ show: false});
  }
  render() {
    const { handleSubmit, submitting } = this.props;
    return(
        <div className='col-md-3 col-lg-2 col-sm-4 filter-wrapper'>
          <form name='myForm' className='form'
            onSubmit={
              handleSubmit((data) => {
                this.props.triggerUpdateYearAndMonth(data)})
          }>
          {(empStatus === 'admin') ?
              <Field name='employee' component={ renderField } type='text' label='Select Employee'>
                { this.props.allEmp ? getAllEmployeesNames(this.props.allEmp): '' }
              </Field> : ''}
            {(empStatus === 'employee') ? <div>
            <p className='notification-status'>Notification :</p>
            <OverlayTrigger
              trigger={[ 'hover']}
              placement='top'
              overlay={tooltipHoverFocus}>
              <span className = {notificationStatus ? 'fa fa-toggle-on fa-3x active' : 'fa fa-toggle-on fa-3x inactive fa-rotate-180'}
                onClick={ this.updateNotificationStatus } ></span>
            </OverlayTrigger></div> :''}
            <Field name='year' component={ renderField }  validate={ required } label='Select Year'>
              { years }
            </Field>
            <Field name='month' component={ renderField } validate={ required } label='Select Month'>
              { months }
            </Field>
            <div className='form-group'> <Button type='submit' disabled={ submitting } bsStyle='primary' className='table-view-button' onClick= { (empStatus === 'admin') ? this.changeViewMode : null}> Search</Button></div>
            {(empStatus === 'admin')  ?
              <div>
                <div className='form-group'>
                  <Button bsStyle='primary' onClick= { this.graphView } className='graph-view-button'> <span className='fa fa-bar-chart-o'></span>| Graph</Button>
                </div>
                <div className='form-group'>
                  <Button bsStyle='primary' onClick= { this.showModal } className='graph-view-button'>Add Entry</Button>
                </div>
                <div className='form-group'>
                  <Button bsStyle='primary' onClick= { this.showModalToSendMail } className='graph-view-button'>Send Email</Button>
                </div>

                <div className='form-group'>
                  <a className='btn btn-primary' target='_blank' href='/salary-slip/#/'>Manage Salary Slips</a>
                </div>
              </div>
            :
            <div>
              <div className='form-group'>
                <a className='btn btn-primary' target='_blank' href={'/salary-slip/#/employee/' + empId + '/salarySlips'}>View Salary Slips</a>
              </div>
            </div>
           }
          </form>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          aria-labelledby='contained-modal-title'
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title'>
            {
              (this.state.isAddEntry ? 'Add Timesheet Entry': 'Send Email')
            }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddEntryForm hide={this.handleHide} allEmp={this.props.allEmp} isAddEntry= {this.state.isAddEntry} admins={this.state.admins}/>
          </Modal.Body>
        </Modal>
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
    empId: state.employee.employee.id,
    notificationStatus: state.employee.employee.notificationStatus,
    allEmp: state.employee.employeesData
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
