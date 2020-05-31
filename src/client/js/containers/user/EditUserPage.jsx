import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Input from "../../components/partials/form_elements/Input";
import { onSubmitFormValidation, onMountedForm } from "../../utils/validtion";
import { goBack } from "../../actions/redirect";
import { format } from "date-fns";
import {
  getInfoAboutUser,
  changeRegisterPersonalInfo,
} from "../../actions/user";

class EditUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      num_certificate: null,
      num_card: null,
      name_organization: null,
      notarius_region: null,
      additional_info: null,
      contacts: null,
      date_issue_certificate: null,
      date_issue_card: null,
      date_reg_region: null,
      location: null,
      region: null,
      type: null,
      loaded: false,
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
      const username = this.props.user.requestedUserObject.id;
      this.props.changeRegisterPersonalInfo(username, formData);
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
      changeRegisterPersonalInfo: (username, formData) =>
        dispatch(changeRegisterPersonalInfo(username, formData)),
    };
  }

  phoneInputOnFocus(e) {
    if (!e.currentTarget.value) {
      e.currentTarget.value = "+380";
    }
  }

  handleFieldChange(field) {
    const this_obj = this;
    console.log(this.props.user.requestedUserObject);

    return function (e) {
      const obj = {};
      if (typeof e.currentTarget.value === "undefined") {
        return;
      }
      obj[field] = e.currentTarget.value;
      this_obj.setState(obj);
    };
  }

  render() {
    if (!this.props.user.userObject || !this.props.user.requestedUserObject)
      return <h1>Loading...</h1>;
    return (
      <React.Fragment>
        <h1>Редагування даних реєстратора</h1>
        <form
          id="edit-profile"
          ref={this.refForm}
          className="needs-validation mx-auto form-default my-4 p-4"
          encType="multipart/form-data"
          method="POST"
          onSubmit={this.formOnSubmit}
          noValidate
        >
          <div className="form-group form-inline">
            <Input
              type="text"
              name="username"
              label="Username"
              value={this.props.user.requestedUserObject.username}
              readOnly={true}
            />
          </div>
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
              value={
                this.state.name === null
                  ? this.props.user.requestedUserObject.name
                  : this.state.name
              }
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="num_certificate"
              label="Номер сертифікату"
              minLength={5}
              maxLength={20}
              helpInfo="8 символів, складається 0-9 "
              pattern="[0-9]{8}"
              valueOnChage={this.handleFieldChange("num_certificate")}
              value={
                this.state.num_certificate === null
                  ? this.props.user.requestedUserObject.num_certificate
                  : this.state.num_certificate
              }
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="num_card"
              label="Номер карти"
              minLength={8}
              maxLength={8}
              helpInfo="8 символів, складається  0-9"
              pattern="[0-9]{8}"
              valueOnChage={this.handleFieldChange("num_card")}
              value={
                this.state.num_card === null
                  ? this.props.user.requestedUserObject.num_card
                  : this.state.num_card
              }
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="name_organization"
              label="Ім'я організації"
              minLength={5}
              maxLength={20}
              helpInfo="від 5 до 20 символів "
              valueOnChage={this.handleFieldChange("name_organization")}
              value={
                this.state.name_organization === null
                  ? this.props.user.requestedUserObject.name_organization
                  : this.state.name_organization
              }
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="notarius_region"
              label="Ноторіальний регіон"
              minLength={5}
              maxLength={20}
              helpInfo="від 5 до 20 символів"
              valueOnChage={this.handleFieldChange("notarius_region")}
              value={
                this.state.notarius_region === null
                  ? this.props.user.requestedUserObject.notarius_region
                  : this.state.notarius_region
              }
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>

          <div className="form-group form-inline">
            <Input
              type="text"
              name="contacts"
              label="Номер телефону"
              minLength={12}
              maxLength={12}
              helpInfo="12 символів, складається з 0-9"
              pattern="[0-9]{12}"
              valueOnChage={this.handleFieldChange("contacts")}
              value={
                this.state.contacts === null
                  ? this.props.user.requestedUserObject.contacts
                  : this.state.contacts
              }
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="date_issue_certificate"
              label="Дата видачі свідоцтва"
              minLength={10}
              maxLength={10}
              helpInfo="dd/mm/yyyy"
              pattern="^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$"
              valueOnChage={this.handleFieldChange("date_issue_certificate")}
              value={
                this.state.date_issue_certificate === null
                  ? format(
                      new Date(
                        this.props.user.requestedUserObject.date_issue_certificate
                      ),
                      "dd/MM/yyyy"
                    )
                  : this.state.date_issue_certificate
              }
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="date_issue_card"
              label="Дата видачі посвідчення"
              minLength={10}
              maxLength={10}
              helpInfo="dd/mm/yyyy"
              pattern="^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$"
              valueOnChage={this.handleFieldChange("date_issue_card")}
              value={
                this.state.date_issue_card === null
                  ? format(
                      new Date(
                        this.props.user.requestedUserObject.date_issue_card
                      ),
                      "dd/MM/yyyy"
                    )
                  : this.state.date_issue_card
              }
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>
          {/* <div className="form-group form-inline">
            <Input
              type="text"
              name="date_reg_region"
              label="Дата реєстрації нотаріального округу"
              minLength={10}
              maxLength={10}
              helpInfo="dd/mm/yyyy"
              pattern="^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$"
              valueOnChage={this.handleFieldChange("date_reg_region")}
              value={
                this.state.date_reg_region === null
                  ? format(
                      new Date(
                        this.props.user.requestedUserObject.date_reg_region
                      ),
                      "DD/MM/YYYY"
                    )
                  : this.state.date_reg_region
              }
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div> */}
          <div className="form-group form-inline">
            <Input
              type="text"
              name="location"
              label="Mісцезнаходження"
              minLength={5}
              maxLength={20}
              helpInfo="від 5 до 20 символів"
              valueOnChage={this.handleFieldChange("location")}
              value={
                this.state.location === null
                  ? this.props.user.requestedUserObject.location
                  : this.state.location
              }
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="region"
              label="Регіон"
              minLength={5}
              maxLength={20}
              helpInfo="від 5 до 20 символів"
              valueOnChage={this.handleFieldChange("region")}
              value={
                this.state.region === null
                  ? this.props.user.requestedUserObject.region
                  : this.state.region
              }
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="select"
              name="type"
              label="Тип"
              options={[
                { name: "Державний", selectValue: true },
                { name: "Приватний", selectValue: false },
              ]}
              value={
                this.state.type === null
                  ? {
                      name: this.props.user.requestedUserObject.type,
                      selectValue: true,
                    }
                  : {
                      name: this.state.type,
                      selectValue: false,
                    }
              }
              valueOnChage={this.handleFieldChange("type")}
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              name="additional_info"
              label="Додаткова інформація"
              valueOnChage={this.handleFieldChange("additional_info")}
              value={
                this.state.additional_info === null
                  ? this.props.user.requestedUserObject.additional_info
                  : this.state.additional_info
              }
              type="textarea"
              maxLength={1000}
              rows={3}
              formInline
            />
          </div>
          <div className="col d-inline-flex">
            <button
              className="btn btn-primary ml-auto mr-4"
              type="submit"
              disabled={this.props.user.isFetching}
            >
              Оновити
            </button>
            <button
              className="btn btn-secondary mr-auto"
              type="reset"
              onClick={this.props.goBack}
            >
              Відмінити
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

EditUserPage.propTypes = {
  user: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
  changeRegisterPersonalInfo: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    EditUserPage.mapStateToProps,
    EditUserPage.mapDispatchToProps
  )(EditUserPage)
);
