import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


// https://www.npmjs.com/package/react-router-breadcrumbs-hoc

////////////////////////////////////////////////////////////////////////////////
// breadcrumbs can be any type of component or string
const UserBreadcrumb = ({ match }) =>
    <span>{match.params.userId}</span>; // use match param userId to fetch/display user name

UserBreadcrumb.propTypes = {
    match: PropTypes.any
};
// define some custom breadcrumbs for certain routes (optional)
const routes = [
    { path: '/registers/edit/:userId', breadcrumb: UserBreadcrumb },
    { path: '/check', breadcrumb: () => <span>Перевірка бланку</span> },
    { path: '/registers/signup', breadcrumb: () => <span>Реєстрація реєстратора</span> },
    { path: '/registers', breadcrumb: () => <span>Реєстратори</span> },
    { path: '/registers/edit', breadcrumb: () => <span>Редагування даних</span> },
    { path: '/registers/update', breadcrumb: () => <span>Оновлення ідентифікаторів</span> },
    { path: '/registers/update/:userId', breadcrumb: UserBreadcrumb },
    { path: '/specialForms', breadcrumb: () => <span>Бланки</span> },
    { path: '/notaries', breadcrumb: () => <span>Нотаріуси</span> },
    { path: '/s', breadcrumb: null },
];
/////////////////////////////////////////////////////////////////////////////////
 
// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
const Breadcrumbs = ({ breadcrumbs }) => (
    <React.Fragment>
        {breadcrumbs.length > 1 ?  
            <ol className="breadcrumb">
                {breadcrumbs.map(({ match, breadcrumb }, index) => (
                    <li className={`breadcrumb-item ${index === breadcrumbs.length - 1 && "active"}`} key={match.url}>
                        {index === breadcrumbs.length - 1 ? 
                            breadcrumb
                            : 
                            <NavLink to={match.url}>
                            {index === 0 ? <FontAwesomeIcon icon={faHome} /> : breadcrumb}
                            </NavLink>
                        }
                    </li>
                ))}
            </ol>
        : null}
    </React.Fragment>
);

Breadcrumbs.propTypes = {
    breadcrumbs: PropTypes.any
};
 
export default withBreadcrumbs(routes)(Breadcrumbs);