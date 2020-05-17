import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Input from '../../components/partials/form_elements/Input';
import { getMinimalInfoAboutSpecialForm } from '../../actions/specialForm';
import { onSubmitFormValidation, onMountedForm } from '../../utils/validtion';
import { toFormatedString } from '../../utils/dateConversion';

class CheckFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serial: '',
            number: '',
            lastSerial: '',
            lastNumber: ''
        };
        this.handleSerialChange = this.handleSerialChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.formOnSubmit = this.formOnSubmit.bind(this);
    }

    static mapStateToProps(store) {
        return { specialForm: store.specialForm };
    }

    static mapDispatchToProps(dispatch) {
        return { getMinimalInfoAboutSpecialForm: (serial, number) => dispatch(getMinimalInfoAboutSpecialForm(serial, number)) };
    }

    componentDidMount() {
        onMountedForm();
    }

    formOnSubmit(e) {
        if (onSubmitFormValidation(e) && !this.props.specialForm.isFetching) {
            this.props.getMinimalInfoAboutSpecialForm(this.state.serial, this.state.number);
            this.setState({
                lastSerial: this.state.serial,
                lastNumber: this.state.number,
            });
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
                <form id="checkFormRegular" className="needs-validation mx-auto form-default mb-4 p-4" method="POST" onSubmit={this.formOnSubmit} style={{maxWidth: "25rem"}} noValidate>
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
                        <button className="btn btn-primary mx-auto" disabled={this.props.specialForm.isFetching} type="submit">Перевірити</button>
                    </div>
                </form>
                {this.props.specialForm.specialFormObject &&
                    <div className="content-bottom col-md-8 mx-auto my-3">
                        <h3 className="text-center mb-4">Результат останньої перевірки:</h3>
                        <p><b>Номер та серія бланка</b>: {this.state.lastSerial} {this.state.lastNumber}</p>
                        <p><b>Код витрачання бланка</b>: {this.props.specialForm.specialFormObject.statusCode} - {this.props.specialForm.specialFormObject.statusPhrase}</p>
                        <p><b>Дата витрачання бланка</b>: {toFormatedString(this.props.specialForm.specialFormObject.dateUsing)}</p>
                        <p><b>Дата та час перевірки бланка</b>: {toFormatedString(new Date())}</p>
                    </div>
                }
            </React.Fragment>
        );
    }
}

CheckFormPage.propTypes = {
    specialForm: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(connect(CheckFormPage.mapStateToProps, CheckFormPage.mapDispatchToProps)(CheckFormPage));
