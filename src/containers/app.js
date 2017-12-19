import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogIn from '../containers/login';
import TimesheetDetails from '../containers/timesheet';
import { Header } from '../components/header';
import { store } from '../store';
import { userLogout } from '../actions/UserActions/user-action';
import { Footer } from '../components/footer';

class App extends Component {
    constructor(props) {
      super(props);
      this.logout = this.logout.bind(this);
    }
    logout() {
      var instance = this;
      store.dispatch(userLogout());
      document.cookie = "'token = '" + " ''";
      instance.props.history.push('./login');
    }
    render() {
        return (
            <div>
              <Header logout={this.logout}/>
              <div className="child-comp">
                <Redirect to='/login' from='/' />
                <Route path='/login' component={ LogIn } />
                <Route path='/timesheet' component={ TimesheetDetails } />
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
export default withRouter(connect(mapStateToProps)(App));
