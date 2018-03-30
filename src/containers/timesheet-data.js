import React, { Component } from 'react';
import Table from 'react-bootstrap/lib/Table';

import { store } from '../store';
import { MONTHS, DAYS } from '../containers/constants';
import { getEmployeeTimesheetData } from '../containers/requests';

let timesheetData, hoursheetData, monthNumber, monthName, year, date;

const TimesheetData = (props) => {
  if(props.totalHours === '00:00' || (props.year === '2017' && props.month < 12) || (props.year === `${new Date().getFullYear()}` && props.month > new Date().getMonth()+1)) {
    return(<div className='no-data-available text-center col-md-9 col-lg-10 col-sm-8'>No data available</div>);
  }
    monthNumber = props.month - 1;
    monthName = MONTHS[monthNumber].substring(0, 3);
    year = props.year;

    if(props.timesheetData){
       timesheetData = props.timesheetData.map(data => {
          date = data.dateString.split('-')[0];
          return(
            <tr key={ data.dateString } >
              <td className='date-string'> { DAYS[new Date(year, monthNumber, date).getDay()] + ', ' }
              {  monthName + ' ' } { date }
              </td>
              <td className='working-hours text-center'>
                { data.officeIn }
              </td>
              <td className='working-hours text-center'>
                { data.officeOut }
              </td>
              <td className='working-hours text-center'>
                { data.homeIn }
              </td>
              <td className='working-hours text-center'>
                { data.homeOut }
              </td>
              <td className='working-total-hours text-center'>
                { data.dayTotal }
              </td>
            <td className='status' dangerouslySetInnerHTML={{__html: data.status}}></td>
            </tr>
          );
        });
    }else {
        if(props.hoursheetData){
          hoursheetData = props.hoursheetData.map(data => {
            function hoursheetData(props, e) {
             e.preventDefault();
             let formData = store.getState().form.TimeFilterForm.values;
             let empData = {
               year : formData.year,
               month : formData.month,
               employee : data.empId
             }
             props.triggerUpdateYearAndMonth(empData);
            }
           return(
             <tr key={ data.empId } >
             <td className='index text-center'>
               { props.hoursheetData.indexOf(data)+1 }
             </td>
               <td className='emp-name text-center'>
               <a onClick={ (e) => {hoursheetData(props, e)} }>  { data.empName } </a>
               </td>
               <td className='text-center'>
                 { data.totalHours }
               </td>
             </tr>
           );
         });
        }

      }

    return(
      <div className='col-md-9 col-lg-10 col-sm-8 timesheet-container'>
      <div className='current-month'>{props.eName}  {MONTHS[props.month-1]}-{props.year}</div>
      {props.timesheetData ?
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th className='date-string text-center'>Date</th>
              <th className='working-hours text-center'>Office In</th>
              <th className='working-hours text-center'>Office Out</th>
              <th className='working-hours text-center'>Home In</th>
              <th className='working-hours text-center'>Home Out</th>
              <th className='working-total-hours text-center'>Total Hours</th>
              <th className='status text-center'>Description</th>
            </tr>
          </thead>
          <tbody>
            {timesheetData}
            <tr>
              <th colSpan='5' className='text-right'>Total Hours</th>
              <th>{ props.totalHours }</th>
              <th></th>
            </tr>
          </tbody>
        </Table> :
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th className='index text-center'> Sr. no </th>
              <th className='emp-name text-center'> Name </th>
              <th className='working-hours text-center'> Hours </th>
            </tr>
          </thead>
          <tbody>
            {hoursheetData}
          </tbody>
        </Table>
      }
    </div>
  );
}

export default TimesheetData;
