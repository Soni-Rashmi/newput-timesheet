import React from 'react';

const TimesheetData = (props) => {
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
        <table className='table table-bordered table-hover col-xs-12'>
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
          </tbody>
        </table>
      </div>
    );
}
export default TimesheetData;
