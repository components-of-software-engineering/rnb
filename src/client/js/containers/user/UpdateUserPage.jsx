import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '../../components/partials/form_elements/Input';
import { onSubmitFormValidation, onMountedForm } from '../../utils/validtion';
import { goBack } from '../../actions/redirect';
import { getInfoAboutUser, changeRegisterPersonalInfo, changeUserPasword } from '../../actions/user';

class UpdateUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old_password: '',
            password: '',
            confirm_pasword: ''
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.photoInputOnChange = this.photoInputOnChange.bind(this);
        this.formOnSubmit = this.formOnSubmit.bind(this);
        this.refForm = React.createRef();
        this.labelPhotoInput = React.createRef();
        props.getInfoAboutUser(props.match.params.username);
        this.confirmPaswInput = this.confirmPaswInput.bind(this);
        this.paswInput =  this.paswInput.bind(this);
    }

    componentDidMount() {
        onMountedForm();
    }

    formOnSubmit(e) { 
        if (onSubmitFormValidation(e) && !this.props.user.isFetching) {
            e.preventDefault();
            const form = this.refForm.current;
            const formData = new FormData(form);
            this.props.changeUserPasword(this.props.match.params.username, formData);
        }       
    }

    photoInputOnChange(e) {
        const fileName = e.currentTarget.value;
        this.labelPhotoInput.current.innerHTML = fileName;
    }
    
    
    static mapStateToProps(store) {
        return { user: store.user };
    }

    static mapDispatchToProps(dispatch) {
        return { 
            goBack: () => dispatch(goBack()),
            getInfoAboutUser: (username) => dispatch(getInfoAboutUser(username)),
            changeUserPasword: (username, formData) => dispatch(changeUserPasword(username, formData))
        };
    }

    phoneInputOnFocus(e) {
        if (!e.currentTarget.value) {
            e.currentTarget.value = '+380';
        }
    }

    handleFieldChange(field) {
        const this_obj = this;
        return function(e) {
            const obj = {};
            if (typeof e.currentTarget.value === "undefined") {
                return;
            }
            obj[field] = e.currentTarget.value;
            this_obj.setState(obj);
        };
    }

    confirmPaswInput(e) {
        this.setState({confirm_password: e.currentTarget.value || ''});
        if (this.state.password !== e.currentTarget.value) {
            e.currentTarget.setCustomValidity("Passwords don't match");
        } else {
            e.currentTarget.setCustomValidity('');
        }
    }

    paswInput(e) {
        this.setState({ password: e.currentTarget.value || ''});
        if (this.state.confirm_password !== '') {
            const pasw_confirm_input = document.getElementById("confirm_pasw_field");
            if (this.state.confirm_password !== e.currentTarget.value) {
                pasw_confirm_input.setCustomValidity("Passwords don't match");
            } else {
                pasw_confirm_input.setCustomValidity('');
            }
        }
    }

    render() {
        if (this.state.name === '' && this.props.user.requestedUserObject && this.props.user.requestedUserObject.name != "") {
            this.setState({
                name: this.props.user.requestedUserObject ?  this.props.user.requestedUserObject.name : '',
            });
        }
        if (!this.props.user.userObject) return <h1>Loading...</h1>;
        return (
            <React.Fragment>
                <h1>Оновлення ідентифікаторів реєстратора</h1>
                <form id="edit-profile" ref={this.refForm} className="needs-validation mx-auto form-default my-4 p-4" encType="multipart/form-data" method="POST" onSubmit={this.formOnSubmit} noValidate>
                <div className="form-group form-inline">
                    <Input 
                        type="password"
                        name="old_password"
                        label="Cтарий пароль"
                        minLength={8}
                        maxLength={30}
                        invalidFeedback="Введіть правильний пароль"
                        valueOnChage={this.paswInput}
                        required
                        />
                    </div>
                    <div className="form-row">
                        <div className="col-md-6 mb-1 form-group">
                            <Input 
                                type="password"
                                name="password"
                                label="Новий пароль"
                                minLength={8}
                                maxLength={30}
                                invalidFeedback="Введіть правильний пароль"
                                valueOnChage={this.paswInput}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-1 form-group">
                            <Input 
                                id="confirm_pasw_field"
                                type="password"
                                name="confirm_password"
                                label="Підтвердження нового паролю"
                                placeholder="Введіть той самий пароль"
                                minLength={8}
                                maxLength={30}
                                invalidFeedback="Пароль не співпадає"
                                valueOnChage={this.confirmPaswInput}
                                required
                            />
                        </div>
                        <small id="pasw_helpBlock" className="form-text text-muted ml-1 mb-3">
                            Пароль повинен бути довжиною від 8 до 30 символів
                        </small>
                    </div>
                    <div className="col d-inline-flex">
                        <button className="btn btn-primary ml-auto mr-4" type="submit" disabled={this.props.user.isFetching}>Оновити</button>
                        <button className="btn btn-secondary mr-auto" onClick={this.props.goBack}>Відмінити</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

UpdateUserPage.propTypes = {
    user: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired,
    changeRegisterPersonalInfo: PropTypes.func.isRequired
};

export default withRouter(connect(UpdateUserPage.mapStateToProps, UpdateUserPage.mapDispatchToProps)(UpdateUserPage));