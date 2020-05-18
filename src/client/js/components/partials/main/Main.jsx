import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from '../../special/ErrorBoundary';
import HomePage from '../../index/HomePage';
import LoginPage from '../../../containers/login/LoginPage';
import RegisterPage from '../../../containers/register/RegisterPage';
import AboutPage from '../../about/AboutPage';
import UsersPage from '../../registers/RegistersPage';
import PageNotFound from '../../special/PageNotFound';
import Breadcrumbs from '../../../containers/partials/main/Breadcrumbs';
import AuthenticatedComponent from '../../../containers/special/AuthenticatedComponent';
import MyUserPage from '../../../containers/user/MyUserPage';
import UserPage from '../../../containers/user/UserPage';
import EditUserPage from '../../../containers/user/EditUserPage';
import UpdateUserPage from '../../../containers/user/UpdateUserPage';
import RegistriesTable from '../../../containers/registries/RegistriesTable';
import { isAdministrator, isRegister } from '../../../utils/service';
import RegistryPage from '../../../containers/registry/RegistryPage';
import EditRegistry from '../../../containers/registry/EditRegistry';
import NewRegistry from '../../../containers/registry/NewRegistry';
import InvoicesTable from '../../../containers/invoices/InvoicesTable';
import InvoicePage from '../../../containers/invoice/InvoicePage';
import NewInvoice from '../../../containers/invoice/NewInvoice';
import EditInvoice from '../../../containers/invoice/EditInvoice';
import DeveloperPage from '../../developer/DeveloperPage';
import CheckFormPage from '../../../containers/checkForm/CheckFormPage';
import SpecialFormsPage from '../../../containers/forms/SpecialFormsPage';
import NewForm from '../../../containers/forms/NewForm';

class Main extends Component {
  render() {
    return (
        <main className="container mt-4" role="main">
            <Breadcrumbs />
            <ErrorBoundary>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                        <Route path='/about' component={AboutPage}/>
                        <Route exact path='/registers' component={AuthenticatedComponent(UsersPage, [isAdministrator])}/>
                            <Route path='/registers/signup' component={AuthenticatedComponent(RegisterPage, [isAdministrator])}/>
                            <Route path='/registers/edit/:username([A-Za-z_0-9]{5,20})' component={AuthenticatedComponent(EditUserPage, [isAdministrator])}/>
                            <Route path='/registers/update/:username([A-Za-z_0-9]{5,20})' component={AuthenticatedComponent(UpdateUserPage, [isAdministrator])}/>
                        <Route exact path='/forms' component={AuthenticatedComponent(SpecialFormsPage, [isRegister])}/>
                        <Route exact path='/forms/add' component={AuthenticatedComponent(NewForm, [isRegister])}/>

                        <Route exact path='/users/me' component={AuthenticatedComponent(MyUserPage, false)}/>
                                <Route path='/users/me/edit' component={AuthenticatedComponent(EditUserPage, false)} />
                            <Route path='/users/:username([A-Za-z_0-9]{5,20})' component={AuthenticatedComponent(UserPage, [isAdministrator])}/>
                        <Route exact path='/registries/' component={AuthenticatedComponent(RegistriesTable, [isAdministrator, isRegister])}/>
                            <Route exact path='/registries/:number(\d{5})' component={AuthenticatedComponent(RegistryPage, [isAdministrator, isRegister])}/>
                                <Route path='/registries/:number(\d{5})/edit' component={AuthenticatedComponent(EditRegistry, [isAdministrator, isRegister])}/>
                            <Route path='/registries/new' component={AuthenticatedComponent(NewRegistry, [isAdministrator, isRegister])}/>
                        <Route exact path='/invoices/' component={AuthenticatedComponent(InvoicesTable, [isAdministrator, isRegister])}/>
                            <Route exact path='/invoices/:number(\d{6})' component={AuthenticatedComponent(InvoicePage, [isAdministrator, isRegister])}/>
                                <Route path='/invoices/:number(\d{6})/edit' component={AuthenticatedComponent(EditInvoice, [isAdministrator, isRegister])}/>
                            <Route path='/invoices/new' component={AuthenticatedComponent(NewInvoice, [isAdministrator, isRegister])}/>
                        <Route path='/login' component={LoginPage} />
                                               <Route path='/check' component={CheckFormPage} />
                        <Route component={PageNotFound}/>
                </Switch>
            </ErrorBoundary>
        </main>
    );
  }
}

export default Main;