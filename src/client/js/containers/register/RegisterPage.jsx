import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Input from "../../components/partials/form_elements/Input";
import { register, checkUsername } from "../../actions/user";
import { onSubmitFormValidation, onMountedForm } from "../../utils/validtion";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      num_certificate: "",
      num_card: "",
      name_organization: "",
      notarius_region: "",
      additional_info: "",
      contacts: "",
      date_issue_certificate: "",
      date_issue_card: "",
      date_reg_region: "",
      location: "",
      region: "",
      pasw: "",
      confirm_pasw: "",
      type: "",
      loginErrorMessage: "Введіть правильний логін",
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.confirmPaswInput = this.confirmPaswInput.bind(this);
    this.paswInput = this.paswInput.bind(this);
    this.loginInput = this.loginInput.bind(this);
    this.formOnSubmit = this.formOnSubmit.bind(this);
    this.refLoginInput = React.createRef();
  }

  static mapStateToProps(store) {
    return { user: store.user };
  }

  static mapDispatchToProps(dispatch) {
    return {
      registerUser: (formData) => dispatch(register(formData)),
      checkUsername: (username) => dispatch(checkUsername(username)),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const node = this.refLoginInput.current;
    if (nextProps.user.registration.username.error) {
      this.setState({
        loginErrorMessage: "Цей логін зайнятий. Виберіть інший",
      });
      node.setCustomValidity("sdf");
    } else {
      this.setState({ loginErrorMessage: "Введіть правильний логін" });
      node.setCustomValidity("");
    }
  }

  componentDidMount() {
    onMountedForm();
  }

  formOnSubmit(e) {
    if (onSubmitFormValidation(e) && !this.props.user.registration.isFetching) {
      e.preventDefault();
      const form = document.getElementById("register");
      const formData = new FormData(form);
      formData.set("role", "0");
      this.props.registerUser(formData);
    }
  }

  loginInput(e) {
    this.setState({ username: e.currentTarget.value || "" });
    if (
      e.currentTarget.value &&
      /[A-Za-z_0-9]{5,20}$/.test(e.currentTarget.value) &&
      !this.props.user.registration.username.isFetching
    ) {
      this.props.checkUsername(e.currentTarget.value);
    }
  }

  phoneInputOnFocus(e) {
    if (!e.currentTarget.value) {
      e.currentTarget.value = "+380";
    }
  }

  confirmPaswInput(e) {
    this.setState({ confirm_pasw: e.currentTarget.value || "" });
    if (this.state.pasw !== e.currentTarget.value) {
      e.currentTarget.setCustomValidity("Passwords don't match");
    } else {
      e.currentTarget.setCustomValidity("");
    }
  }

  paswInput(e) {
    this.setState({ pasw: e.currentTarget.value || "" });
    if (this.state.confirm_pasw !== "") {
      const pasw_confirm_input = document.getElementById("confirm_pasw_field");
      if (this.state.confirm_pasw !== e.currentTarget.value) {
        pasw_confirm_input.setCustomValidity("Passwords don't match");
      } else {
        pasw_confirm_input.setCustomValidity("");
      }
    }
  }

  handleFieldChange(field) {
    const this_obj = this;
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
    return (
      <React.Fragment>
        <h1>Реєстрація нового Нотаріуса</h1>
        <p>Усі поля форми, наведеної нижче, є необхідними для заповнення:</p>
        <form
          id="register"
          className="needs-validation mx-auto form-default mb-4 p-4"
          onSubmit={this.formOnSubmit}
          noValidate
        >
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
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="username"
              label="Логін"
              minLength={5}
              maxLength={20}
              helpInfo="від 5 до 20 символів, складається з A-Z, a-z, 0-9 та _"
              invalidFeedback={this.state.loginErrorMessage}
              pattern="[A-Za-z_0-9]{5,20}"
              valueOnChage={this.loginInput}
              formInline
              refAction={this.refLoginInput}
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
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="date_reg_region"
              label="Дата реєстрації нотаріального округу"
              minLength={10}
              maxLength={10}
              helpInfo="dd/mm/yyyy"
              pattern="^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$"
              valueOnChage={this.handleFieldChange("date_reg_region")}
              formInline
              refAction={this.refLoginInput}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="location"
              label="Mісцезнаходження"
              minLength={5}
              maxLength={20}
              helpInfo="від 5 до 20 символів"
              valueOnChage={this.handleFieldChange("location")}
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
              value={this.state.additional_info}
              type="textarea"
              maxLength={1000}
              rows={3}
              formInline
            />
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-1 form-group">
              <Input
                type="password"
                name="password"
                label="Пароль"
                minLength={8}
                maxLength={30}
                invalidFeedback="Введіть правильний пароль"
                valueOnChage={this.paswInput}
                required
              />
            </div>
            <div className="col-md-6 mb-1 form-group">
              <Input
                type="password"
                name="confirm_pasw"
                label="Підтвердження паролю"
                placeholder="Введіть той самий пароль"
                minLength={8}
                maxLength={30}
                invalidFeedback="Пароль не співпадає"
                valueOnChage={this.confirmPaswInput}
                required
              />
            </div>
            <small
              id="pasw_helpBlock"
              className="form-text text-muted ml-1 mb-3"
            >
              Пароль повинен бути довжиною від 8 до 30 символів
            </small>
          </div>
          <div className="col d-inline-flex">
            <button
              className="btn btn-primary ml-auto mr-4"
              type="submit"
              disabled={this.props.user.registration.isFetching}
            >
              Зареєструватися
            </button>
            <button className="btn btn-secondary mr-auto" type="reset">
              Скинути
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

RegisterPage.propTypes = {
  user: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  checkUsername: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(
  connect(
    RegisterPage.mapStateToProps,
    RegisterPage.mapDispatchToProps
  )(RegisterPage)
);
