import React, { Component } from 'react';
import queryString from 'query-string';
import cookie from 'react-cookies';
import { connect } from 'react-redux';

import TimesheetData from '../containers/timesheet-data';
import TimeFilter from '../containers/time-filter';
import { store } from '../store';
import { getEmployeeTimesheetData, getUserDetail, getAllEmployeesDetails } from '../containers/requests';
import Graph from '../containers/graph';
import { TIMESHEET_URL, MONTHS } from '../containers/constants';

let empStatus, viewMode, obj, url, params, year, month, allEmpData;

class TimesheetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalHours: null,
      hoursheetData: null,
      timesheetData: null,
      year: null,
      month: null,
      emp_id: null,
      isLoading: false,
      eName: null
    }
    this.updateYearAndMonth = this.updateYearAndMonth.bind(this);
  }

  updateYearAndMonth(data) {
    this.setState({isLoading : true});
    if(data.employee === 'Select Employee'){
      data ={
        year : data.year,
        month: data.month
      }
    }
    if(data.year && data.month) {
      getEmployeeTimesheetData(this, data).then(() => {
        obj = {year: data.year, month: data.month};
        url = `${TIMESHEET_URL}?year=${data.year}&month=${data.month}`;
        if (data.employee) {
          obj['emp_id'] = data.employee;
          url += `&emp_id=${data.employee}`;
        }
        this.setState({emp_id: obj.emp_id, year: obj.year, month: obj.month});
        this.props.history.push(url);
      });
    }
  }

  componentDidMount() {
    if(store.getState().employee && store.getState().employee.employee) {
     empStatus = store.getState().employee.employee.status;
   } else {
     getUserDetail().then(function() {
       empStatus = store.getState().employee.employee.status;
     }).catch(function(){});
    }
     if(empStatus === 'admin'){
        getAllEmployeesDetails().then(function(){
          allEmpData = store.getState().employee.employeesData;
        }).catch(function() {});
      }
      getQueryParams(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isLoading:true});
     if(empStatus === 'admin') {
      getAllEmployeesDetails().then(function(){
       allEmpData = store.getState().employee.employeesData;
     }).catch(function() {});
    }
     getQueryParams(this);
  }

  render() {
    let eName='';
    if(!this.state.hoursheetData && !this.state.timesheetData) {
      return (
        <div className='spinner1'>
          <i className='fa fa-spinner fa-pulse fa-2x'></i>
        </div>
      );
    }
    return(
      <div>
      {empStatus === 'admin' && allEmpData ?allEmpData.map(data => {
        ((data.id === this.state.emp_id)?
        eName+= `${data.fullName},` :'')
      }): ''}
        <TimeFilter triggerUpdateYearAndMonth={(data) => this.updateYearAndMonth(data)} year={this.state.year}
          month={this.state.month} history={this.props.history}
          initialValues={{year:this.state.year, month:this.state.month, employee: this.state.emp_id}}
        />
        {(this.state.isLoading) ?
          <div className='spinner col-md-9 col-lg-10'>
            <i className='fa fa-spinner fa-pulse fa-2x'></i>
          </div> :
        ((empStatus === 'admin' && cookie.load('viewMode') === 'table')||(empStatus === 'employee') ?
          <TimesheetData hoursheetData={this.state.hoursheetData} timesheetData={this.state.timesheetData} totalHours={this.state.totalHours}
            year={this.state.year} month={this.state.month} triggerUpdateYearAndMonth={(data) => this.updateYearAndMonth(data)} eName={eName}
          /> :
          <Graph history={this.props.history} hoursheetData={this.state.hoursheetData}
            year={this.state.year} month={this.state.month}
          />)
        }
      </div>
    );
  }
}

function getQueryParams(instance) {
  let data, employee = '';
  params = queryString.parse(instance.props.history.location.search);

  if(params.year && params.month ) {
      year= params.year;
      month= params.month;
      if(params.emp_id) {
        if(params.emp_id !== 'Select Employee'){
          employee= params.emp_id;
        }else {
          employee = ''
        }
      } else {
        employee = ''
      }
    } else {
        year= new Date().getFullYear();
        month= new Date().getMonth()+1;
      }
    data = {
      year: year,
      month: month,
      employee: employee
    };

  getEmployeeTimesheetData(instance, data);

}

export default TimesheetDetails;
