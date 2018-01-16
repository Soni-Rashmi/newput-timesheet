import React, { Component } from 'react';
import axios from 'axios';

import TimesheetData from '../containers/timesheet-data';
import TimeFilter from '../containers/time-filter';
import { store } from '../store';
import { MONTHS } from '../containers/constants';

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
      if(data.employee){
        setYearAndMonth(this, data).then(() => {
           this.setState({year: data.year, month: data.month, emp_id: data.employee });
        });
      } else {
        setYearAndMonth(this, data).then(() => {
           this.setState({year: data.year, month: data.month});
        });
      }
    }
    //this.props.history.location.search = `?emp_id=${data.employee}&year=${data.year}`;
    // this.props.history.push( {
    //   pathname: '/timesheet',
    //   search: `?emp_id=${data.employee}&year=${data.year}&month=${MONTHS[data.month-1]}`
    // })
    this.props.history.push('/timesheet');
  }

  componentDidMount() {
    setYearAndMonth(this, null);
  }

  render() {
    if(!this.state.timesheetData ){
      return (
        <div className='spinner'>
          <i className='fa fa-spinner fa-pulse fa-2x '></i>
        </div>
      );
    }
    return(
      <div>
        <TimeFilter triggerUpdateYearAndMonth={(data) => this.updateYearAndMonth(data)} year={this.state.year} month={this.state.month} history={this.props.history}/>
        <TimesheetData timesheetData={this.state.timesheetData} totalHours={this.state.totalHours} year={this.state.year} month={this.state.month} />
      </div>
    );
  }
}

function setYearAndMonth(instance, data) {

  let year, month, user_id, url;
  if(data) {
    year = data.year;
    month = data.month;
    if(data.employee){
      user_id = data.employee;
    }
  } else {
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
  }

   url = `http://34.211.76.6:9095/rest/timesheet?year=${year}&month=${month}`;

  if(user_id ){
    if(user_id === 'Select Employee'){
      url = `http://34.211.76.6:9095/rest/timesheet?year=${year}&month=${month}`;
    } else {
      url = `http://34.211.76.6:9095/rest/admin/timesheet?year=${year}&month=${month}&user_id=${user_id}`;
    }
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
