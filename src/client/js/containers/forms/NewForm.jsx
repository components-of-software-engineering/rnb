import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Input from '../../components/partials/form_elements/Input';
import { register, checkUsername } from '../../actions/user';
import { onSubmitFormValidation, onMountedForm } from '../../utils/validtion';

class NewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            phone: '',
            login: '',
            pasw: '',
            confirm_pasw: '',
            loginErrorMessage: 'Введіть правильний логін'
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.confirmPaswInput = this.confirmPaswInput.bind(this);
        this.paswInput =  this.paswInput.bind(this);
        this.loginInput =  this.loginInput.bind(this);
        this.formOnSubmit = this.formOnSubmit.bind(this);
        this.refLoginInput = React.createRef();
    }

    static mapStateToProps(store) {
        return { user: store.user };
    }

    static mapDispatchToProps(dispatch) {
        return { 
            registerUser: (formData) => dispatch(register(formData)),
            checkUsername: (username) => dispatch(checkUsername(username))
        };
    }

    componentDidMount() {
        onMountedForm();
    }

    formOnSubmit(e) {
        if (onSubmitFormValidation(e) && !this.props.user.registration.isFetching) {
            e.preventDefault();
            const form = document.getElementById("register");
            const formData = new FormData(form);
            
        }       
    }

    loginInput(e){
        this.setState({login: e.currentTarget.value || ''});
        if (e.currentTarget.value && /[A-Za-z_0-9]{5,20}$/.test(e.currentTarget.value) && !this.props.user.registration.username.isFetching) {
            this.props.checkUsername(e.currentTarget.value);
        }
    }

    phoneInputOnFocus(e) {
        if (!e.currentTarget.value) {
            e.currentTarget.value = '+380';
        }
    }

    confirmPaswInput(e) {
        this.setState({confirm_pasw: e.currentTarget.value || ''});
        if (this.state.pasw !== e.currentTarget.value) {
            e.currentTarget.setCustomValidity("Passwords don't match");
        } else {
            e.currentTarget.setCustomValidity('');
        }
    }

    paswInput(e) {
        this.setState({ pasw: e.currentTarget.value || ''});
        if (this.state.confirm_pasw !== '') {
            const pasw_confirm_input = document.getElementById("confirm_pasw_field");
            if (this.state.confirm_pasw !== e.currentTarget.value) {
                pasw_confirm_input.setCustomValidity("Passwords don't match");
            } else {
                pasw_confirm_input.setCustomValidity('');
            }
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

    render() {
        return (
            <React.Fragment>
                <h1>Реєстрація нового звіту витрачання бланка</h1>
                <p>
                    Усі поля форми, наведеної нижче, є необхідними для заповнення:
                </p>
                <form id="register-form-blank" className="needs-validation mx-auto form-default mb-4 p-4" onSubmit={this.formOnSubmit} noValidate>
                    <div className="form-group form-inline ">
                        <Input
                            type="text"
                            name="serial"
                            label="Серія"
                            minLength={2}
                            maxLength={3}
                            pattern="[АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЮЯІЇҐЄабвгдежзийклмнопрстуфхцчшщьюяіїґє]{2,3}"
                            invalidFeedback="Введіть правильну серію"
                            valueOnChage={this.handleSerialChange}
                            required
                        />
                    </div>
                    <div className="form-group form-inline">
                        <Input 
                            type="text"
                            name="number"
                            label="Номер"
                            minLength={6}
                            maxLength={7}
                            pattern="[0-9]{6,7}"
                            invalidFeedback="Введіть правильний номер"
                            valueOnChage={this.handleNumberChange}
                            required
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            type={"select"}
                            name="notarius_id"
                            label="Нотаріус"
                            invalidFeedback="виберіть нотаріус"
                            valueOnChage={this.handleRegistryChange}
                            refAction={this.registrySelect}
                            formInline
                            value={this.state.registryNum}
                            optionNotSelectedText={"виберіть нотаріус"}
                            options={[ {selectvalue: 1, name: "Київський державний нотаріус"}, {selectvalue: 2, name: "Павловський Павло Павлович"}]}
                            required
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            type={"select"}
                            name="usage_id"
                            label="Код використання"
                            invalidFeedback="виберіть код"
                            valueOnChage={this.handleRegistryChange}
                            refAction={this.registrySelect}
                            formInline
                            value={this.state.registryNum}
                            optionNotSelectedText={"виберіть код"}
                            options={[ 
                                {selectvalue: 1, name: "1 - договір про відчуження нерухомого майна"}, 
                                {selectvalue: 2, name: "2 - договір про відчуження транспортного засобу"},
                                {selectvalue: 15, name: "15 - договір про відчуження земельної ділянки"},
                                {selectvalue: 12, name: "12 - шлюбний договір"},
                                {selectvalue: 14, name: "14 - установчий договір"},
                                {selectvalue: 3, name: "3 - інші договори"},
                                {selectvalue: 4, name: "4 - заповіт"},
                                {selectvalue: 5, name: "5 - свідоцтво про право на спадщину"},
                                {selectvalue: 6, name: "6 - свідоцтво про право власності"},
                                {selectvalue: 7, name: "7 - довіреність"},
                                {selectvalue: 8, name: "8 - заява"},
                                {selectvalue: 10, name: "10 - переклад"},
                                {selectvalue: 11, name: "11 - дублікат"},
                                {selectvalue: 13, name: "13 - інші дії"},
                                {selectvalue: 16, name: "16 - протест векселя"},
                                {selectvalue: 21, name: "21 - зіпсований бланк"},
                                {selectvalue: 22, name: "22 - анульований бланк"},
                                {selectvalue: 23, name: "23 - дефектний бланк"},
                                {selectvalue: 24, name: "24 - відсутній бланк"},
                                {selectvalue: 25, name: "25 - викрадений бланк"},
                                {selectvalue: 26, name: "26 - втрачений бланк"},
                            ]}
                            required
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            type={"text"}
                            name="additionalText"
                            label="Додаткова інформація"
                            valueOnChage={this.handleRegistryChange}
                            refAction={this.registrySelect}
                            formInline
                            value={this.state.registryNum}
                        />
                    </div>

                    
                    <div className="col d-inline-flex">
                        <button className="btn btn-primary ml-auto mr-4" type="submit" disabled={this.props.user.registration.isFetching}>Зареєструватися</button>
                        <button className="btn btn-secondary mr-auto" type="reset">Скинути</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

NewForm.propTypes = {
    user: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    checkUsername: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(connect(NewForm.mapStateToProps, NewForm.mapDispatchToProps)(NewForm));