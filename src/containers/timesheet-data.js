import React from 'react';
import TimeFilter from '../containers/timeFilter';
import { months } from '../containers/constants';
import { days } from '../containers/constants';

let i = 1;
const TimesheetData = (props) => {
    const timesheetData = props.timesheetData.map(data => {
        return(
            <tr key={data.dateString}>
              <td>{days[new Date(Date.parse(data.date)).getDay()]+ ', '}
              {months[new Date(Date.parse(data.date)).getMonth()].substring(0,3) + ' '}
              {new Date(Date.parse(data.date)).getDate()}
              </td>
              <td className='working-hours'>
                {data.officeIn}
              </td>
              <td className='working-hours'>
                {data.officeOut}
              </td>
              <td className='working-hours'>
                {data.homeIn}
              </td>
              <td className='working-hours'>
                {data.homeOut}
              </td>
              <td className='working-total-hours'>
                {data.dayTotal}
              </td>
              <td>
                {data.status}
              </td>
            </tr>
        );
    });


    return(
      <div className='timesheet-container'>
        <div className='current-month'>{ months[new Date().getMonth()]+ ','} {new Date().getFullYear()} </div>
        <table className='table table-bordered table-striped'>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Office In</th>
              <th>Office Out</th>
              <th>Home In</th>
              <th>Home Out</th>
              <th>Total Hours</th>
              <th>Description</th>
            </tr>
            {timesheetData}
            <tr>
              <th colSpan='5' className='text-right'>Total Hours</th>
              <th>{props.totalHours}</th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    );
}
export default TimesheetData;

// need to add < TimeFilter />
