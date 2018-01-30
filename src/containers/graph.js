import React, { Component } from 'react';
import { BarChart } from 'react-easy-chart';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Button from 'react-bootstrap/lib/Button';
import queryString from 'query-string';

import { getEmployeeTimesheetData } from '../containers/requests';
import { MONTHS } from '../containers/constants';
import TimeFilter from '../containers/time-filter';

let chartData = {};
let allEmpData = [];
let empNames = [];
let year, month;

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state= {
      graphData: null,
      showToolTip: false,
      top: '',
      left: ''
    }

    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
  }

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: d.y+100,
      left: e.clientX-180
    });

    displaySelectedUser(d, this);
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
  }

  componentDidMount(){
    updateGraphData(this, this.props)
  }

  componentWillReceiveProps(nextProps){
    updateGraphData(this, nextProps);
  }

  render() {
    return (
      <div>
        {
          (year === '2017' && month < 12) || (year === `${new Date().getFullYear()}` && month > new Date().getMonth()+1 )?
            <div className='no-data-available text-center col-sm-6'> No data available </div>  :
            <div className='col-md-9 col-lg-10 graph-view' style={{overflowY: 'auto'}}>
              <BarChart
                axes
                axesLabels={{x: 'My x Axis', y: 'My y Axis'}}
                grid
                colorBars
                height={450}
                width={1100}
                margin={{top: 20, right: 50, bottom: 30, left: 50}}
                yDomainRange={[0, 300]}
                data={ allEmpData }
                mouseOverHandler={this.mouseOverHandler}
                mouseOutHandler={this.mouseOutHandler}
                style= {{ cursor: 'pointer' }}

              />
            { this.state.showToolTip ?
              <Tooltip id='tooltip' className='in' style={{top:this.state.top, left: this.state.left}} >
                <span> { this.state.dataDisplay } </span>
              </Tooltip>
            : ''}
          </div>
        }
      </div>
    );
  }
}

function updateGraphData(instance, nextProps) {
  chartData = {};
  allEmpData =[];
  empNames = [];
  const params = queryString.parse(nextProps.history.location.search);
  year =params.year;
  month = params.month;
  let data = {
    year: year,
    month: month
  }
  
  getEmployeeTimesheetData(this, data);
  nextProps.hoursheetData.map((empData, index) => {
      chartData = {
        x: nextProps.hoursheetData[index].empName.split(' ')[0] + ' ' + (nextProps.hoursheetData[index].empName.split(' ')[1]).substring(0,1)+ '.' ,
        y: parseFloat(Number((empData.totalHours).replace(':', '.')))
      }
      empNames.push(nextProps.hoursheetData[index].empName);

      instance.setState({graphData: allEmpData.push(chartData)});
    });
}
function displaySelectedUser(d, instance) {
  let name ;
  empNames.map(eName => {
    if(d.x === eName.split(' ')[0] + ' ' + (eName.split(' ')[1]).substring(0,1) + '.') {
      name = eName;
    }
  });

  instance.setState({dataDisplay: `${name} | ${d.y}`});
}

export default Graph;
