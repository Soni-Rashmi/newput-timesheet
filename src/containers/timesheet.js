import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import TimesheetData from '../containers/timesheet-data';
import TimeFilter from '../containers/time-filter';
import { store } from '../store';
import { MONTHS } from '../containers/constants';
import { getUserDetail } from '../containers/get-user-details';

class TimesheetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timesheetData: null,
      year: null,
      month: null,
      emp_id: null
    }

    this.updateYearAndMonth = this.updateYearAndMonth.bind(this);
  }

  updateYearAndMonth(data) {
    if(data.year && data.month) {
      setYearAndMonth(this, data).then(() => {
        let obj = {year: data.year, month: data.month};
        let url = `/timesheet?year=${data.year}&month=${data.month}`;
        if (data.employee) {
          obj['emp_id'] = data.employee
          url += `&emp_id=${data.employee}`;
        } else {
          obj['emp_id'] = store.getState().employee.employee.id;
          url += `&emp_id=${store.getState().employee.employee.id}`;
        }
        this.setState(obj);
        this.props.history.push(url);
      });
    }
  }

  componentDidMount() {
    let params = queryString.parse(this.props.history.location.search);
    let data;
    if(params.year && params.month && params.emp_id) {
      data = {
        year: params.year,
        month: params.month,
        employee: params.emp_id
      };
    } else {
      data = {
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1
      };
    }
    setYearAndMonth(this, data);
  }

  componentWillReceiveProps() {
    let params = queryString.parse(this.props.history.location.search);
    let data;
    if(params.year && params.month && params.emp_id) {
      data = {
        year: params.year,
        month: params.month,
        employee: params.emp_id
      };
    } else {
      data = {
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1
      };
    }
    setYearAndMonth(this, data);
  }

  render() {
    if(!this.state.timesheetData){
      return (
        <div className='spinner'>
          <i className='fa fa-spinner fa-pulse fa-2x '> </i>
        </div>
      );
    }
    return(
      <div>
        <TimeFilter triggerUpdateYearAndMonth={(data) => this.updateYearAndMonth(data)} year={this.state.year} month={this.state.month} history={this.props.history} initialValues={{year:this.state.year, month:this.state.month, employee: this.state.user_id}} />
        <TimesheetData timesheetData={this.state.timesheetData} totalHours={this.state.totalHours} year={this.state.year} month={this.state.month} />
      </div>
    );
  }
}

function setYearAndMonth(instance, data) {
  let year, month, user_id, url, empStatus;
  if(data) {
    year = data.year;
    month = data.month;
    if(data.employee){
      user_id = data.employee;
    }
  }

    if(store.getState().employee && store.getState().employee.employee){
      empStatus = store.getState().employee.employee.status;
    } else {
      getUserDetail().then(function() {
        empStatus = store.getState().employee.employee.status;
      }).catch(function(){});
    }
    if(empStatus === 'admin'){
      url = `http://34.211.76.6:9095/rest/admin/timesheet?year=${year}&month=${month}&user_id=${user_id}`;
    } else {
      url = `http://34.211.76.6:9095/rest/timesheet?year=${year}&month=${month}`;
    }

  return(
    axios.get(url)
    .then (function (response) {
       instance.setState({timesheetData: response.data.data.timesheetData, totalHours: response.data.data.totalHours, year, month, user_id});
    })
    .catch(function (error) { })
  );
}

export default TimesheetDetails;
