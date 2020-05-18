import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '../../components/partials/form_elements/Input';
import { onSubmitFormValidation, onMountedForm } from '../../utils/validtion';
import { goBack } from '../../actions/redirect';
import { getInfoAboutUser, changeRegisterPersonalInfo } from '../../actions/user';

class EditUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.photoInputOnChange = this.photoInputOnChange.bind(this);
        this.formOnSubmit = this.formOnSubmit.bind(this);
        this.refForm = React.createRef();
        this.labelPhotoInput = React.createRef();
        props.getInfoAboutUser(props.match.params.username);
    }

    componentDidMount() {
        onMountedForm();
    }

    formOnSubmit(e) { 
        if (onSubmitFormValidation(e) && !this.props.user.isFetching) {
            e.preventDefault();
            const form = this.refForm.current;
            const formData = new FormData(form);
            this.props.changeRegisterPersonalInfo(this.props.match.params.username, formData);
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
            changeRegisterPersonalInfo: (username, formData) => dispatch(changeRegisterPersonalInfo(username, formData))
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

    render() {
        if (this.state.name === '' && this.props.user.requestedUserObject && this.props.user.requestedUserObject.name != "") {
            this.setState({
                name: this.props.user.requestedUserObject ?  this.props.user.requestedUserObject.name : '',
            });
        }
        if (!this.props.user.userObject) return <h1>Loading...</h1>;
        return (
            <React.Fragment>
                <h1>Редагування даних реєстратора</h1>
                <form id="edit-profile" ref={this.refForm} className="needs-validation mx-auto form-default my-4 p-4" encType="multipart/form-data" method="POST" onSubmit={this.formOnSubmit} noValidate>
                    <div className="form-group form-inline ">
                        <Input 
                            type="text"
                            name="name"
                            label="Повне ім'я"
                            minLength={3}
                            maxLength={30}
                            invalidFeedback="Введіть правильне ім'я"
                            helpInfo="Ім'я повинно мати довжину від 3 до 30 символів включно"
                            valueOnChage={this.handleFieldChange("name")}
                            formInline
                            value={this.state.name}
                            required
                        />
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

EditUserPage.propTypes = {
    user: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired,
    changeRegisterPersonalInfo: PropTypes.func.isRequired
};

export default withRouter(connect(EditUserPage.mapStateToProps, EditUserPage.mapDispatchToProps)(EditUserPage));