import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Input from '../../components/partials/form_elements/Input';
import { authenticate } from '../../actions/user';
import { onSubmitFormValidation, onMountedForm } from '../../utils/validtion';

class CheckFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serial: '',
            number: ''
        };
        this.handleSerialChange = this.handleSerialChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.formOnSubmit = this.formOnSubmit.bind(this);
    }

    static mapStateToProps(store) {
        return { user: store.user };
    }

    static mapDispatchToProps(dispatch) {
        return { login: (username, password) => dispatch(authenticate(username, password)) };
    }

    componentDidMount() {
        onMountedForm();
    }

    formOnSubmit(e) {
        if (onSubmitFormValidation(e) && !this.props.user.isFetching) {
            //this.props.login(this.state.username, this.state.password);
            e.preventDefault();
        }       
    }

    handleSerialChange(e) {
        this.setState({ serial: e.currentTarget.value || ''});
    }

    handleNumberChange(e) { 
        this.setState({ number: e.currentTarget.value || ''});
    }

    render() {
        return (
            <React.Fragment>
                <h1>Перевірка спеціального бланка нотаріального документа</h1>
                <p>
                    Щоби дізнатися дату та код витрачання бланку, введіть його серію та номер у форму нижче:
                </p>
                <form id="checkFormRegular" className="needs-validation mx-auto form-default mb-4 p-4" action="/api/v1/check-regular" method="POST" onSubmit={this.formOnSubmit} style={{maxWidth: "25rem"}} noValidate>
                    <div className="form-row">
                        <div className="col-md-4 mb-1 form-group">
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
                        <div className="col-md-8 mb-1 form-group">
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
                        <small id="_helpBlock" className="form-text text-muted ml-1 mb-3">
                            Серія повинна містити лише літери кирилиці.<br/>
                            Кількість літер повинна бути від 2 до 3.<br/>
                            Номер бланка повинен містити 6 або 7 цифр.
                        </small>
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-primary mx-auto" disabled={this.props.user.isFetching} type="submit">Перевірити</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

CheckFormPage.propTypes = {
    user: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(connect(CheckFormPage.mapStateToProps, CheckFormPage.mapDispatchToProps)(CheckFormPage));
