import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isAdministrator, isRegister } from '../../../utils/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';




class UserStatusBar extends Component {
    guestView() {
        return (
            <div className="container center-block text-center">
                <div className="row">
                    <div className="col d-md-inline-flex">
                        <Link role="button" to="/login" className="btn btn-primary btn-sm">Увійти</Link>
                        <Link role="button" to="/register" className="btn btn-outline-primary ml-3 btn-sm">Зареєструватися</Link>
                    </div>
                </div>
            </div>
        );
    }

    userView(user) {
        const { name, role } = user;
        return (
            <li className="nav-item dropdown align-middle">
                <a className="nav-link dropdown-toggle text-nowrap align-middle pointer" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    { name }<span>{ isAdministrator(role) && <FontAwesomeIcon icon={faStar} className="ml-1" /> }</span>
                    <span>{ isRegister(role) && <FontAwesomeIcon icon={faUserCog} className="ml-1" /> }</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown01">
                    <Link className="dropdown-item" to="/users/me">Мій профіль</Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={this.props.logout} className="dropdown-item pointer text-danger" type="submit"><FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />Вийти</button>
                </div>
            </li>
        );
    }

    render() {
        const { isLogined, userObject: user } = this.props.user;
        return (
            <ul className="navbar-nav navbar-right">
                { isLogined ? this.userView(user) : this.guestView() }
            </ul>
        );
    }
}

UserStatusBar.propTypes = {
    user: PropTypes.shape({
        isLogined: PropTypes.bool.isRequired,
        userObject: PropTypes.object
    }),
    logout: PropTypes.func.isRequired
};

export default UserStatusBar;