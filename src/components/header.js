import React, { Component } from 'react';
import { store } from '../store';

export default class Header extends Component {
    render () {
        return (
            <nav className="navbar navbar-default" id="header">
                <div>
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand"><img className="brand-img"  alt="brand"/></a>
                        <span className="navbar-brand">Newput Infotech Pvt ltd.</span>
                    </div>
                </div>
                <div className="collapse navbar-collapse" id="app-navbar-collapse">
                  { (store.employee.user) ? <span>Welcome {store.employee.user.fullName}</span> : ''}
                    { (JSON.parse(localStorage.getItem('empStatus')) && (JSON.parse(localStorage.getItem('empStatus')).isLoggedIn))? <a>Logout </a> : <a>Login</a> }
                </div>
            </nav>
        );
    }
}
