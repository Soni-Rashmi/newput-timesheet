import React from 'react';
import { MONTHS, DAYS } from '../containers/constants';

const TimesheetData = (props) => {
    let monthNumber = props.month - 1;
    let  monthName = MONTHS[monthNumber].substring(0, 3);
    let year = props.year;
    const timesheetData = props.timesheetData.map(data => {
        let date = data.dateString.split('-')[0];
        return(
            <tr key={ data.dateString } >
              <td className='date-string'> { DAYS[new Date(year, monthNumber, date).getDay()] + ', ' }
              {  monthName + ' ' }
              { date }
              </td>
              <td className='working-hours'>
                { data.officeIn }
              </td>
              <td className='working-hours'>
                { data.officeOut }
              </td>
              <td className='working-hours'>
                { data.homeIn }
              </td>
              <td className='working-hours'>
                { data.homeOut }
              </td>
              <td className='working-total-hours'>
                { data.dayTotal }
              </td>
              <td className='status'>
                { data.status }
              </td>
            </tr>
        );
    });

    return(
      <div className='timesheet-container'>
        <table className='table table-bordered table-striped'>
          <tbody>
            <tr>
              <th className='date-string'>Date</th>
              <th className='working-hours'>Office In</th>
              <th className='working-hours'>Office Out</th>
              <th className='working-hours'>Home In</th>
              <th className='working-hours'>Home Out</th>
              <th className='working-total-hours'>Total Hours</th>
              <th className='status'>Description</th>
            </tr>
            {timesheetData}
            <tr>
              <th colSpan='5' className='text-right'>Total Hours</th>
              <th>{ props.totalHours }</th>
              <th></th>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default TimesheetData;
