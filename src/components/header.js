import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { store } from '../store';
import { userLogout } from '../actions/UserActions/user-action';

export default class Header extends Component {
    render () {
        return (
            <nav className="navbar navbar-default" id="header">
                <div>
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand"><img className="brand-img" src="../src/assets/images/company_logo.png" alt="brand"/></a>
                        <span className="navbar-brand">Timesheet</span>
                    </div>
                    <div className="collapse navbar-collapse" id="app-navbar-collapse">
                      {(store.getState() && store.getState().employee && store.getState().employee.isUserLoggedIn) ?
                        <ul className="nav navbar-nav navbar-right">
                            <li><span>{ (store.getState() && store.getState().employee && store.getState().employee.employee) ? store.getState().employee.employee.fullName : 'rashmi' }</span></li>
                            <li><a href="javascript:void(0);" ><span className="fa fa-power-off"></span> Logout</a></li>
                        </ul>: ' ' }
                    </div>
                </div>
            </nav>
        );
    }
}

// function logout(instance) {
//     localStorage.setItem('token', '');
//     store.dispatch(userLogout());
//     instance.props.history.push('./login');
// }
