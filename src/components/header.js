import React from 'react';
import { store } from '../store';
import { connect } from 'react-redux';
import { userLogout } from '../actions/UserActions/user-action';
import { getUserDetail } from '../containers/get-user-details';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      console.log("inside render- hearder");
      console.log(store.getState());
      {(cookie.load('token') && !(this.props.employee))?
        getUserDetail() : ''}
      return(
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
            <Link to='/timesheet'>Time</Link>
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
  // console.log(state.employee.employee + "mapStateToProps");
  return {
    employee: state.employee.employee
  };
}

export default connect (mapStateToProps)(Header);
