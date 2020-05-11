import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isAdministrator as checkAdminRights } from '../../utils/service';
import { updateInvoice, getInvoiceByNum } from '../../actions/invoice';
import { getAllUsers } from '../../actions/users';
import InvoiceForm from '../../components/invoice/InvoiceForm';
import { goBack } from '../../actions/redirect';


class EditInvoice extends Component {
    constructor(props) {
        super(props);
        const num = props.match.params.number;
        this.registryNum = num;
        this.props.getInvoiceByNum(num);
        this.props.getAllUsers(1, -1);
        this.onFormSubmited = this.onFormSubmited.bind(this);
    }

    static mapStateToProps(store) {
        return { user: store.user, users: store.users, registry: store.registry, invoice: store.invoice };
    }

    static mapDispatchToProps(dispatch) {
        return {
            updateInvoice: (number, formData) => dispatch(updateInvoice(number, formData)),
            getInvoiceByNum: (number) => dispatch(getInvoiceByNum(number)),
            getAllUsers: (page, limit) => dispatch(getAllUsers(page, limit)),
            goBack: () => dispatch(goBack())
        };
    }

    onFormSubmited(reregistryNumber, formData) {
        this.props.updateInvoice(reregistryNumber, formData);
    }

    getOptionsFromUsers(users, username, isAdministrator) {
        if(!users) return null;
        if (!isAdministrator) {
            users = users.filter(x => x.login !== username);
        }
        return users.map(x => {
            return { selectValue: x.login, name: x.fullname };
        });
    }

    getGroup(users) {
        if(!users) return null;
        return users.map(user => {
            return {
                label: user.fullname,
                username: user.login,
                value: user.registries.map(y => {
                    return {
                        name: `№${y.number} - ${y.name}`,
                        selectValue: y.number
                    };
                })
            };
        });
    }

    myRegistries(user) {
        return user.registries.map(y => {
            return {
                name: `№${y.number} - ${y.name}`,
                selectValue: y.number
            };
        });
    }
    
    render() {
        if (!this.props.users.usersObject || !this.props.invoice || !this.props.invoice.invoiceObject) {
            return <h1>Loading...</h1>;
        }
        const user = this.props.user.userObject;
        const users = this.props.users.usersObject.data;
        const isAdministrator = checkAdminRights(user.role);
        return <InvoiceForm 
            registriesArr={isAdministrator ? this.getGroup(users) : this.myRegistries(user)} 
            isFetching={this.props.invoice.isFetching} 
            invoice={this.props.invoice.invoiceObject.data} 
            user={user} 
            goBackCallback={this.props.goBack} 
            formSubmitCallback={this.onFormSubmited} 
            users={this.getOptionsFromUsers(isAdministrator ? users : this.props.users.usersObject , user.login, isAdministrator)} 
        />;
    }
}

EditInvoice.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.object,
    match: PropTypes.object.isRequired,
    registry: PropTypes.object,
    invoice: PropTypes.object,
    updateInvoice: PropTypes.func.isRequired,
    getInvoiceByNum: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func,
    goBack: PropTypes.func
};

export default withRouter(connect(EditInvoice.mapStateToProps, EditInvoice.mapDispatchToProps)(EditInvoice));