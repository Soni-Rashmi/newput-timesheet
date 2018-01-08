import React, { Component } from 'react';
import axios from 'axios';

import TimesheetData from '../containers/timesheet-data';
import TimeFilter from '../containers/time-filter';

class TimesheetDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timesheetData: null,
      year: null,
      month: null
  }
    this.updateYearAndMonth = this.updateYearAndMonth.bind(this);
  }

  updateYearAndMonth(data) {
    if(data.year && data.month){
       setYearAndMonth(this, data).then(() => {
          this.setState({year: data.year, month: data.month});
       });
    } else {
       setYearAndMonth(this, null);
    }
  }

  componentDidMount() {
    setYearAndMonth(this, null);
  }

  render() {
    if(!this.state.timesheetData){
      return (
        <div className='spinner'>
          <i className='fa fa-spinner fa-pulse fa-2x '></i>
        </div>
      );
    } else {
      return(
        <div>
          <TimeFilter triggerUpdateYearAndMonth={(data) => this.updateYearAndMonth(data)} year={this.state.year} month={this.state.month} />
          <TimesheetData timesheetData={this.state.timesheetData} totalHours={this.state.totalHours} year={this.state.year} month={this.state.month} />
        </div>
      );
    }
  }
}

function setYearAndMonth(instance, data) {
  let year, month;
  if(data) {
    year = data.year;
    month= data.month;
  } else {
    year = new Date().getFullYear();
    month= new Date().getMonth() + 1;
  }
  return(
    axios.get(`http://34.211.76.6:9095/rest/timesheet?year=${year}&month=${month}`)
    .then (function (response) {
       instance.setState({timesheetData: response.data.data.timesheetData, totalHours: response.data.data.totalHours, year, month});
    })
    .catch(function (error) { })
  );
}

export default TimesheetDetails;
