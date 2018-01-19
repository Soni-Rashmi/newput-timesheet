import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

import LoginValidationForm from '../containers/login-form';
import TimesheetDetails from '../containers/timesheet';
import Header from '../components/header';
import { store } from '../store';
import { userLogout } from '../actions/UserActions/user-action';
import { Footer } from '../components/footer';
import ResetPasswordForm from '../containers/reset-password-form';
import Graph from '../containers/graph';

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);;
  }

  logout() {
    var instance = this;
    store.dispatch(userLogout());
    cookie.remove('token', { path: '/' });
    instance.props.history.push('/login');
  }

  render() {
    return (
      <div className='container-fluid'>
        <Header logout={this.logout} />
          <div className="child-comp row">
            <Switch>
              <Redirect exact from='/' to='/login' />
              <Route exact path='/login' render={(props) => (isLoggedIn() ? <Redirect to='/timesheet' /> : <LoginValidationForm history={props.history} />) } />
              <Route exact path='/timesheet' render={(props) => (!isLoggedIn() ? <Redirect to='/login' /> : <TimesheetDetails history={props.history} />) }  />
              <Route exact path='/reset-password' render={(props) => (!isLoggedIn() ? <Redirect to='/login' /> : <ResetPasswordForm history={props.history} />) } />
              <Route exact path='/graph-view' render={(props) => (!isLoggedIn() ? <Redirect to='/login' /> : <Graph history={props.history} />) } />
            </Switch>
          </div>
        <Footer />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    employee: state.employee
  };
};

function isLoggedIn() {
  if (cookie.load('token')) {
    return true;
  }
  return false;
}

export default withRouter(connect(mapStateToProps)(App));
