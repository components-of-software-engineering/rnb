import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Input from "../../components/partials/form_elements/Input";
import { register, checkUsername } from "../../actions/user";
import { getAllNotarius } from "../../actions/notarius";
import { createSpecialForm } from "../../actions/specialForm";
import { onSubmitFormValidation, onMountedForm } from "../../utils/validtion";

class NewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serial: "",
      number: "",
      additional_info: "",
      fullname: "",
      date_receiving: "",
      type: "",
      code_usage: "",
      notarius_id: "",
      tax_num: "",
    };
    console.log(this.state);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.formOnSubmit = this.formOnSubmit.bind(this);
    this.refLoginInput = React.createRef();
  }

  static mapStateToProps(store) {
    return {
      user: store.user,
      notarius: store.notarius,
      specialForm: store.specialForm,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      registerUser: (formData) => dispatch(register(formData)),
      getAllNotarius: () => dispatch(getAllNotarius()),
      createSpecialForm: (formData) => dispatch(createSpecialForm(formData)),
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
      console.log(form);
      const formData = new FormData(form);
      this.props.createSpecialForm(formData);
      this.props.history.push("/forms");
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
    if (!this.props.notarius?.notariusObjectAll) {
      return <h1>Loading...</h1>;
    }
    return (
      <React.Fragment>
        <h1>Реєстрація нової довіреності</h1>
        <p>Усі поля форми, наведеної нижче, є необхідними для заповнення:</p>
        <form
          id="register-form-blank"
          className="needs-validation mx-auto form-default mb-4 p-4"
          onSubmit={this.formOnSubmit}
          noValidate
        >
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
              name="tax_number"
              label="Ідентифікаційний номер"
              minLength={10}
              maxLength={10}
              pattern="[0-9]{10}"
              invalidFeedback="Введіть ідентифікаційний номер"
              valueOnChage={this.handleFieldChange("tax_number")}
              value={this.state.tax_number}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="num"
              label="Номер"
              minLength={8}
              maxLength={8}
              pattern="[0-9]{8,8}"
              invalidFeedback="Введіть правильний номер"
              valueOnChage={this.handleFieldChange("number")}
              value={this.state.number}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="fullname"
              label="Кому видана"
              minLength={3}
              maxLength={20}
              invalidFeedback="Введіть ім'я"
              valueOnChage={this.handleFieldChange("fullname")}
              value={this.state.fullname}
              required
            />
          </div>
          <div className="form-group form-inline">
            <Input
              type="text"
              name="date_receiving"
              label="Дійсна до "
              minLength={10}
              maxLength={10}
              pattern="^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$"
              valueOnChage={this.handleFieldChange("date_receiving")}
              refAction={this.refLoginInput}
              value={this.state.date_receiving}
              required
            />
          </div>
          <div className="form-group form-inline " hidden>
            <Input
              type={"test"}
              name="notarius_id"
              label="Нотаріус"
              invalidFeedback="виберіть код"
              valueOnChage={this.handleFieldChange("notarius_id")}
              refAction={this.registrySelect}
              formInline
              value={this.props.user.userObject.id}
              required
            />
          </div>
          <div className="form-group form-inline ">
            <Input
              type={"select"}
              name="type"
              label="Код використання"
              invalidFeedback="виберіть код"
              valueOnChage={this.handleFieldChange("type")}
              refAction={this.registrySelect}
              formInline
              value={this.state.registryNum}
              optionNotSelectedText={"виберіть код"}
              options={[
                {
                  selectValue: "Загальна (генеральна) довіреність",
                  name: "Загальна (генеральна) довіреність",
                },
                {
                  selectValue: "Спеціальна довіреність",
                  name: "Спеціальна довіреність",
                },
                {
                  selectValue: "Разова довіреність",
                  name: "Разова довіреність",
                },
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
          <input
            name="user_id"
            value={this.props.user?.userObject?.id}
            type="hidden"
          />

          <div className="col d-inline-flex">
            <button
              className="btn btn-primary ml-auto mr-4"
              type="submit"
              disabled={this.props.specialForm.isFetching}
            >
              Зареєструвати витрачання
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

NewForm.propTypes = {
  user: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(
  connect(NewForm.mapStateToProps, NewForm.mapDispatchToProps)(NewForm)
);
