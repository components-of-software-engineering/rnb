import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Input from '../../components/partials/form_elements/Input';
import { register, checkUsername } from '../../actions/user';
import { getAllNotarius } from '../../actions/notarius';
import { createSpecialForm } from '../../actions/specialForm';
import { onSubmitFormValidation, onMountedForm } from '../../utils/validtion';

class NewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serial: '',
            number: '',
            additional_info: ''
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.formOnSubmit = this.formOnSubmit.bind(this);
        this.refLoginInput = React.createRef();
    }

    static mapStateToProps(store) {
        return { 
            user: store.user,
            notarius: store.notarius,
            specialForm: store.specialForm
        };
    }

    static mapDispatchToProps(dispatch) {
        return { 
            registerUser: (formData) => dispatch(register(formData)),
            getAllNotarius: () => dispatch(getAllNotarius()),
            createSpecialForm: (formData) => dispatch(createSpecialForm(formData))
        };
    }

    componentDidMount() {
        setTimeout(() => onMountedForm(), 500);
        this.props.getAllNotarius();
    }

    formOnSubmit(e) {
        if (onSubmitFormValidation(e) && !this.props.specialForm.isFetching) {
            e.preventDefault();
            const form = document.getElementById("register-form-blank");
            const formData = new FormData(form);
            this.props.createSpecialForm(formData);
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
        if (!this.props.notarius?.notariusObjectAll) {
            return <h1>Loading...</h1>
        }
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
                            name="series"
                            label="Серія"
                            minLength={2}
                            maxLength={2}
                            pattern="[АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЮЯІЇҐЄабвгдежзийклмнопрстуфхцчшщьюяіїґє]{2,2}"
                            invalidFeedback="Введіть правильну серію"
                            valueOnChage={this.handleFieldChange("serial")}
                            value={this.state.serial}
                            required
                        />
                    </div>
                    <div className="form-group form-inline">
                        <Input 
                            type="text"
                            name="num"
                            label="Номер"
                            minLength={6}
                            maxLength={7}
                            pattern="[0-9]{6,7}"
                            invalidFeedback="Введіть правильний номер"
                            valueOnChage={this.handleFieldChange("number")}
                            value={this.state.number}
                            required
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            type={"select"}
                            name="notarius_id"
                            label="Нотаріус"
                            invalidFeedback="виберіть нотаріус"
                            valueOnChage={this.handleFieldChange("notarius_id")}
                            refAction={this.registrySelect}
                            formInline
                            value={this.state.registryNum}
                            optionNotSelectedText={"виберіть нотаріус"}
                            options={this.props.notarius?.notariusObjectAll?.map(x => ({selectValue: x.id, name: `#${x.id} ${x.type ? x.name_organization : x.name}`}))}
                            required
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            type={"select"}
                            name="code_usage"
                            label="Код використання"
                            invalidFeedback="виберіть код"
                            valueOnChage={this.handleFieldChange("code_usage")}
                            refAction={this.registrySelect}
                            formInline
                            value={this.state.registryNum}
                            optionNotSelectedText={"виберіть код"}
                            options={[ 
                                {selectValue: 1, name: "1 - договір про відчуження нерухомого майна"}, 
                                {selectValue: 2, name: "2 - договір про відчуження транспортного засобу"},
                                {selectValue: 15, name: "15 - договір про відчуження земельної ділянки"},
                                {selectValue: 12, name: "12 - шлюбний договір"},
                                {selectValue: 14, name: "14 - установчий договір"},
                                {selectValue: 3, name: "3 - інші договори"},
                                {selectValue: 4, name: "4 - заповіт"},
                                {selectValue: 5, name: "5 - свідоцтво про право на спадщину"},
                                {selectValue: 6, name: "6 - свідоцтво про право власності"},
                                {selectValue: 7, name: "7 - довіреність"},
                                {selectValue: 8, name: "8 - заява"},
                                {selectValue: 10, name: "10 - переклад"},
                                {selectValue: 11, name: "11 - дублікат"},
                                {selectValue: 13, name: "13 - інші дії"},
                                {selectValue: 16, name: "16 - протест векселя"},
                                {selectValue: 21, name: "21 - зіпсований бланк"},
                                {selectValue: 22, name: "22 - анульований бланк"},
                                {selectValue: 23, name: "23 - дефектний бланк"},
                                {selectValue: 24, name: "24 - відсутній бланк"},
                                {selectValue: 25, name: "25 - викрадений бланк"},
                                {selectValue: 26, name: "26 - втрачений бланк"},
                            ]}
                            required
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            name="additional_info"
                            label="Додаткова інформація"
                            valueOnChage={this.handleFieldChange("additional_info")}
                            value={this.state.additional_info}
                            type="textarea"
                            maxLength={1000}
                            rows={3}
                            formInline
                        />
                    </div>
                    <input name="user_id" value={this.props.user?.userObject?.id} type="hidden" />
                    
                    <div className="col d-inline-flex">
                        <button className="btn btn-primary ml-auto mr-4" type="submit" disabled={this.props.specialForm.isFetching}>Зареєструвати витрачання</button>
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