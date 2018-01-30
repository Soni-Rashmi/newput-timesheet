import React, { Component } from 'react';
import Route  from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import withRouter from 'react-router-dom/withRouter';
import Switch from 'react-router-dom/Switch';
import cookie from 'react-cookies';

import LoginValidationForm from '../containers/login-form';
import TimesheetDetails from '../containers/timesheet';
import Header from '../components/header';
import { store } from '../store';
import { userLogout } from '../actions/UserActions/user-action';
import { Footer } from '../components/footer';
import ResetPasswordForm from '../containers/reset-password-form';
import Graph from '../containers/graph';
import  { LOGIN_URL, RESET_PASSWORD_URL, TIMESHEET_URL } from '../containers/constants';


class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);;
  }

  logout() {
    var instance = this;
    store.dispatch(userLogout());
    cookie.remove('token', { path: '/' });
    cookie.remove('viewMode', { path: '/' });
    instance.props.history.push({LOGIN_URL});
  }

  render() {
    return (
      <div className='container-fluid'>
        <Header logout={this.logout} />
          <div className='child-comp row'>
            <Switch>
              <Redirect exact from='/' to={LOGIN_URL}/>
              <Route exact path={LOGIN_URL} render={(props) => (isLoggedIn() ? <Redirect to={TIMESHEET_URL} /> : <LoginValidationForm history={props.history} />) } />
              <Route exact path={TIMESHEET_URL} render={(props) => (!isLoggedIn() ? <Redirect to={LOGIN_URL} /> : <TimesheetDetails history={props.history} />) }  />
              <Route exact path={RESET_PASSWORD_URL} render={(props) => (!isLoggedIn() ? <Redirect to={LOGIN_URL} /> : <ResetPasswordForm history={props.history} />) } />
            </Switch>
          </div>
        <Footer />
      </div>
    );
  }
};

function isLoggedIn() {
  if (cookie.load('token')) {
    return true;
  }
  return false;
}

export default withRouter(App);
