import React, { Component } from 'react';
import axios from 'axios';
import { BarChart } from 'react-easy-chart';
import { Tooltip, Button } from 'react-bootstrap';

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
    this.goToDashboard = this.goToDashboard.bind(this);
  }

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: e.clientY,
      left: e.clientX
    });

    displaySelectedUser(d, this);
  }


  mouseOutHandler() {
    this.setState({showToolTip: false});
  }

  goToDashboard () {
    this.props.history.push('/timesheet');
  }

  componentDidMount(){
    chartData = {};
    allEmpData =[];
    empNames = [];
    let searchParams = this.props.history.location.search.substring(1).split('&');
     year= searchParams[0].split('=')[1];
     month = searchParams[1].split('=')[1];
    getGraphData(year, month).then((data) => {
      data.map((empData, index) => {
        chartData = {
          x: data[index].empName.split(' ')[0] + ' ' + (data[index].empName.split(' ')[1]).substring(0,1)+ '.' ,
          y: parseFloat(Number((empData.totalHours).replace(':', '.')))
        }
        empNames.push(data[index].empName);

        this.setState({graphData: allEmpData.push(chartData)});
      });
    });
  }

  render() {
    if(!this.state.graphData){
      return (
        <div className='spinner'>
          <i className='fa fa-spinner fa-pulse fa-2x '></i>
        </div>
      );
    }

    return (
      <div>
        <Button onClick={ this.goToDashboard } bsStyle='primary' style= {{marginTop:'10px', marginLeft: '40px' }} > <span className='fa fa-arrow-left fa-2x' aria-hidden='true'></span></Button>
        <div className='col-sm-7 pull-right current-month'>
          {
            (month && year) ? <span> { MONTHS[month-1] }, { year } </span> : <span> { MONTHS[new Date().getMonth()] }, { new Date().getFullYear() }</span>
          }
        </div>
        {
          (year === '2017' && month < 12) || (year === `${new Date().getFullYear()}` && month > new Date().getMonth()+1 ) || (year.length > 4  || year.length < 4) || (month > 12 || month < 1 )?
            <div className='no-data-available text-center col-sm-6 col-sm-offset-3'> No data available </div>  :
            <div >
              <BarChart
                axes
                axesLabels={{x: 'My x Axis', y: 'My y Axis'}}
                grid
                colorBars
                height={450}
                width={1200}
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

function displaySelectedUser(d, instance) {
  let name ;
  empNames.map(eName => {
    if(d.x === eName.split(' ')[0] + ' ' + (eName.split(' ')[1]).substring(0,1) + '.') {
      name = eName;
    }
  });

  instance.setState({dataDisplay: `${name} | ${d.y}`});
}

function getGraphData (year, month){

  let url = `http://34.211.76.6:9095/rest/admin/graph/hoursheet?year=${year}&month=${month}`;

  return axios.get(url).then( function (response) {
    return response.data.data;
  }).catch(function (error) { });
}

export default Graph;
