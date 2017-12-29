import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LogIn from '../containers/login';
import TimesheetDetails from '../containers/timesheet';
import { Header } from '../components/header';
import { store } from '../store';
import { userLogout } from '../actions/UserActions/user-action';
import { Footer } from '../components/footer';
import ResetPasswordComponent from '../containers/resetPasswordComponent';
import cookie from 'react-cookies';

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    var instance = this;
    store.dispatch(userLogout());
    cookie.remove('token', { path: '/' });
    instance.props.history.push('./login');
  }

  render() {
    return (
      <div>
        <Header logout={this.logout}/>
        <div className="container-fluid">
          <div className="child-comp row">
            <Switch>
              <Redirect exact from='/' to='/login' />
              <Route exact path='/login' component= { LogIn } />
              <Route exact path='/timesheet' render={() => (!isLoggedIn() ? <Redirect to='/login' /> : <TimesheetDetails />)}  />
              <Route exact path='/resetPassword' render={() => (!isLoggedIn() ? <Redirect to='/login' /> : <ResetPasswordComponent />)}/>
            </Switch>
          </div>
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

function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    console.log('in requireAuth');
  }
}
export default withRouter(connect(mapStateToProps)(App));
