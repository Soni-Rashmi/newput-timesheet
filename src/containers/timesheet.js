import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import TimesheetData from '../containers/timesheet-data';
import {store } from '../store';
import { updateUser } from '../actions/UserActions/user-action';

class TimesheetDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            timesheetData: null
        }
    }
    componentDidMount() {
        const instance = this;
        axios.get('http://34.211.76.6:9095/rest/timesheet')
        .then (function (response) {
            instance.setState({timesheetData: response.data.data});
        })
        .catch(function (error) {
            instance.props.history.push('/login');
        });
    }
    render(){
        return(
            <div>
                {this.state.timesheetData ? <TimesheetData timesheetData={this.state.timesheetData} /> : <h1>Loading...</h1> }
            </div>
        );
    }
}

export default TimesheetDetails;
