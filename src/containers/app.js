import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LogIn from '../containers/login';
import TimesheetDetails from '../containers/timesheet';
import Header from '../components/header';

export default class App extends Component {
    render() {
        return (
            <div>
              <Header />
              <Route path='/login' component={ LogIn } />
              <Route path='/timesheet' component={ TimesheetDetails } />
            </div>
        );
    }
};
