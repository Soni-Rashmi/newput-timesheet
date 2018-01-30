import React, { Component } from 'react';
import queryString from 'query-string';
import cookie from 'react-cookies';

import TimesheetData from '../containers/timesheet-data';
import TimeFilter from '../containers/time-filter';
import { store } from '../store';
import { getEmployeeTimesheetData, getUserDetail } from '../containers/requests';
import Graph from '../containers/graph';
import  { TIMESHEET_URL } from '../containers/constants';

let empStatus, viewMode, obj, url, params, data, year, month, employee;

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
      isLoading: false
    }
    this.updateYearAndMonth = this.updateYearAndMonth.bind(this);
  }

  updateYearAndMonth(data) {
    this.setState({isLoading: true});
    if(data.year && data.month) {
      getEmployeeTimesheetData(this, data).then(() => {

        obj = {year: data.year, month: data.month};
        url = `${TIMESHEET_URL}?year=${data.year}&month=${data.month}`;
        if (data.employee && data.employee !== 'Select Employee') {
          obj['emp_id'] = data.employee;
          url += `&emp_id=${data.employee}`;
        } else {
          obj['emp_id'] = store.getState().employee.employee.id;
        }
        this.setState({isLoading: false});
        this.setState(obj);
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
     getQueryParams(this);
  }

  componentWillReceiveProps() {
    getQueryParams(this);
  }

  render() {
    if(!this.state.hoursheetData && !this.state.timesheetData) {
      return (
        <div className='spinner'>
          <i className='fa fa-spinner fa-pulse fa-2x'></i>
        </div>
      );
    }
    return(
      <div>
        <TimeFilter triggerUpdateYearAndMonth={(data) => this.updateYearAndMonth(data)} year={this.state.year}
          month={this.state.month} history={this.props.history}
          initialValues={{year:this.state.year, month:this.state.month, employee: this.state.user_id}}
        />
        {(this.state.isLoading) ?
          <div className='spinner col-md-9 col-lg-10'>
            <i className='fa fa-spinner fa-pulse fa-2x'></i>
          </div> :
          ((empStatus === 'admin' && cookie.load('viewMode') === 'table')||(empStatus === 'employee') ?
            <TimesheetData hoursheetData={this.state.hoursheetData} timesheetData={this.state.timesheetData} totalHours={this.state.totalHours}
              year={this.state.year} month={this.state.month} triggerUpdateYearAndMonth={(data) => this.updateYearAndMonth(data)}
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
   params = queryString.parse(instance.props.history.location.search);
   data, year, month, employee
    if(params.year && params.month ) {
        year= params.year;
        month= params.month;
        if(params.emp_id) {
          if(params.emp_id !== 'Select Employee'){
            employee= params.emp_id;
          }
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
