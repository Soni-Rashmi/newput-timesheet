import React from 'react';
import { store } from '../store';
import { userLogout } from '../actions/UserActions/user-action';
import { getUserDetail } from '../containers/get-user-details';
import cookie from 'react-cookies';

export const Header = ((props) => {
    if(cookie.load('token') && !(store.getState().employee)){
      getUserDetail().then(function(){
        console.log("inside getUserDetail");
      });
      console.log(store.getState().employee);
    }
    return (
        <nav className='navbar navbar-default' id='header'>
            <div className='navbar-header'>
                <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#app-navbar-collapse' aria-expanded='false'>
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>
                    <span className='icon-bar'></span>
                </button>
                <a className='navbar-brand'><img className='brand-img' src='http://www.newput.com/wp/wp-content/uploads/2016/01/newput-logo.png' alt='logo'/></a>
                <div className='navbar-brand-text'>Timesheet</div>
            </div>
            <div className='collapse navbar-collapse' id='app-navbar-collapse' aria-expanded='false'>
              { (store.getState().employee && store.getState().employee.isUserLoggedIn) ?
                <ul className='nav navbar-nav navbar-right'>
                    <li className='employee-profile'>
                      <img  className='profile-img' src={store.getState().employee.employee.profileImgSmall}></img>
                      <span className='employee-name'>{ (store.getState().employee) ? store.getState().employee.employee.fullName : ' ' }</span>
                    </li>
                    <li><a onClick={() => props.logout()} ><span className='fa fa-power-off'></span> Logout</a></li>
                </ul>: ' '  }
            </div>
        </nav>
    );
});
