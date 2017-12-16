import React from 'react';

const TimesheetData = (props) => {
    const empName = props.name;
    const timesheetData = props.data.map(data => {
        return(
            <tr key={data.dateString}>
              <td>
                {data.dateString}
              </td>
              <td>
                {data.officeIn}
              </td>
              <td>
                {data.officeOut}
              </td>
              <td>
                {data.homeIn}
              </td>
              <td>
                {data.homeOut}
              </td>
              <td>
                {data.dayTotal}
              </td>
              <td>
                {data.status}
              </td>
            </tr>
        );
    });
    return(
      <div>
        <table className='table table-bordered col-xs-12'>
          <tbody>
            <tr>
              <th rowSpan='3' className='date'>Date</th>
              <th colSpan='5'>TIME</th>
              <th rowSpan='3' className='desc'>Description</th>
            </tr>
            <tr>
              <th colSpan='2'>Office</th>
              <th colSpan='2'>Home</th>
              <th rowSpan='2' className='time-cell'>Total Hours</th>
            </tr>
            <tr>
              <th className='time-cell'>Begin</th>
              <th className='time-cell'>End</th>
              <th className='time-cell'>Begin</th>
              <th className='time-cell'>End</th>
            </tr>
            {timesheetData}
          </tbody>
        </table>
      </div>
    );
}
export default TimesheetData;
