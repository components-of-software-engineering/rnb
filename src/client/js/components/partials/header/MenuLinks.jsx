import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { isAdministrator, isRegister } from '../../../utils/service';

class MenuLinks extends Component {
    LoginedUserLinks(role) {
        const linkUsers = (
            <li className="nav-item">
                <NavLink className="nav-link text-nowrap pl-2 pl-md-auto" activeClassName="active" to='/users' exact>Користувачі</NavLink>
            </li>
        );
        const linkEntities = (admin) => {
            return (
                <React.Fragment>
                    <li className="nav-item">
                        <NavLink className="nav-link text-nowrap pl-2 pl-md-auto" activeClassName="active" to='/registries' exact>{ admin ? "Реєстри" : "Мої реєстри" }</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-nowrap pl-2 pl-md-auto" activeClassName="active" to='/invoices' exact>{ admin ? "Транспортні накладні" : "Мої транспортні накладні" }</NavLink>
                    </li>
                </React.Fragment>
            );
        };
        const linkPanelAdmin = (
            <>
                <li className="nav-item">
                    <NavLink className="nav-link text-nowrap pl-2 pl-md-auto" activeClassName="active" to='/registers'>Реєстратори</NavLink>
                </li>
            </>
        );
        const linkPanelRregitser = (
            <li className="nav-item">
                <NavLink className="nav-link text-nowrap pl-2 pl-md-auto" activeClassName="active" to='/hmm'>Hmmm</NavLink>
            </li>
        );
        if (role < 0) return null;
        return ( 
            <React.Fragment>
                {/* { isAdministrator(role) && linkUsers } */}
                { isAdministrator(role) ? linkPanelAdmin : linkPanelRregitser }
            </React.Fragment>
        );
    }
    
    render() {
        const { isLogined } = this.props.user;
        let role = -1;
        if (isLogined) {
            role = this.props.user.userObject.role;
        }
        return (
            <ul className="navbar-nav mr-auto my-2 my-md-0">
                <li className="nav-item">
                    <NavLink className="nav-link text-nowrap pl-2 pl-md-auto" activeClassName="active" to='/' exact={true}>Головна</NavLink>
                </li>
                {this.LoginedUserLinks(role)}
                {role < 0 &&
                    <li className="nav-item">
                        <NavLink className="nav-link text-nowrap pl-2 pl-md-auto" activeClassName="active" to='/check'>Перевірити бланк</NavLink>
                    </li>
                }
            </ul>
        );
    }
}

MenuLinks.propTypes = {
    user: PropTypes.shape({
        isLogined: PropTypes.bool.isRequired,
        userObject: PropTypes.object
    })
};

export default MenuLinks;