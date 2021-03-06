import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import cookie from 'react-cookies/build/cookie';

import { userLogout } from '../actions/UserActions/user-action';
import { getUserDetail, goToDashboard } from '../containers/requests';

class Header extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
        {(cookie.load('token') && !(this.props.employee))?
          getUserDetail() : ''}
    }

    render() {
      return(
          <nav className='navbar navbar-default navbar-fixed-top' id='header'>
              <div className='navbar-header'>
                  <button type='button' className={cookie.load('token') ? 'navbar-toggle collapsed' : 'hidden'} data-toggle='collapse' data-target='#app-navbar-collapse' aria-expanded='false'>
                      <span className='icon-bar'></span>
                      <span className='icon-bar'></span>
                      <span className='icon-bar'></span>
                  </button>
                  <a className='navbar-brand' onClick={() => {goToDashboard(this.props.history)}}><img className='brand-img' src='http://www.newput.com/wp/wp-content/uploads/2016/01/newput-logo.png' alt='logo'/></a>
                  <div className='navbar-brand-text text-center'>Timesheet</div>
              </div>
              <div className='collapse navbar-collapse' id='app-navbar-collapse' aria-expanded='false'>
                { (this.props.employee && cookie.load('token')) ?
                  <ul className='nav navbar-nav navbar-right'>
                      <li className='employee-profile'>
                        <img  className='profile-img' src={ this.props.employee.profileImgSmall } alt='profile image' />
                        <span className='employee-name'> { this.props.employee.fullName } </span>
                      </li>
                      <li><a onClick={() => this.props.logout()} ><span className='fa fa-power-off'></span> Logout</a></li>
                  </ul>: ' ' }
              </div>
          </nav>
      );
    }
}

function mapStateToProps(state) {
  return {
    employee: state.employee.employee
  };
}

export default connect (mapStateToProps)(Header);
