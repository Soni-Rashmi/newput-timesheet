import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import TimesheetData from '../containers/timesheet-data';
import {store } from '../store';
import { updateUser } from '../actions/UserActions/user-action';

class TimesheetDetails extends Component {
    constructor(props) {
      console.log("in TimesheetDetails");
        super(props);
        this.state={
            data: null
        }
    }
    componentWillMount() {
      const instance = this;
      axios.get('http://34.211.76.6:9095/rest/employee/detail')
      .then (function (response) {
          store.dispatch(updateUser(response.data));
          console.log(store.getState());
           //instance.setState({name: response.data.fullName});
      })
      .catch(function (error) {
          instance.props.history.push('/login');
      });
    }
    componentDidMount() {
        const instance = this;
        axios.get('http://34.211.76.6:9095/rest/timesheet')
        .then (function (response) {
            instance.setState({data: response.data.data});
        })
        .catch(function (error) {
            instance.props.history.push('/login');
        });

        // axios.get('http://34.211.76.6:9095/rest/employee/detail')
        // .then (function (response) {
        //     instance.setState({name: response.data.data.fullName});
        // })
        // .catch(function (error) {
        //     instance.props.history.push('/login');
        // });
    }
    render(){
        return(
            <div>
                {this.state.data ? <TimesheetData data={this.state.data} name={this.state.name}/> : <h1>Loading...</h1> }
            </div>
        );
    }
}

export default TimesheetDetails;
