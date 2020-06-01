import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Input from "../../components/partials/form_elements/Input";
import { getMinimalInfoAboutSpecialForm } from "../../actions/specialForm";
import { onSubmitFormValidation, onMountedForm } from "../../utils/validtion";
import { toFormatedString } from "../../utils/dateConversion";

class CheckFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serial: "",
      number: "",
      lastSerial: "",
      lastNumber: "",
      dateCheck: new Date(),
      FetchedDovirenist: false,
    };
    this.handleSerialChange = this.handleSerialChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.formOnSubmit = this.formOnSubmit.bind(this);
  }

  static mapStateToProps(store) {
    return { specialForm: store.specialForm };
  }

  static mapDispatchToProps(dispatch) {
    return {
      getMinimalInfoAboutSpecialForm: (serial, number) =>
        dispatch(getMinimalInfoAboutSpecialForm(serial, number)),
    };
  }

  componentDidMount() {
    onMountedForm();
  }

  async formOnSubmit(e) {
    e.preventDefault();
    if (onSubmitFormValidation(e) && !this.props.specialForm.isFetching) {
      const dovirenist = await fetch("/blank/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          series: this.state.serial,
          num: this.state.number,
        }),
      }).then((res) => res.json());
      console.log(dovirenist);
      this.setState({
        blank: dovirenist.blank,
        FetchedDovirenist: true,
        dateCheck: new Date(),
      });
    }
  }

  handleSerialChange(e) {
    this.setState({ serial: e.currentTarget.value || "" });
  }

  handleNumberChange(e) {
    this.setState({ number: e.currentTarget.value || "" });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Перевірка довіреності</h1>
        <p>
          Щоби дізнатися інформацію про довіреності, введіть його серію та номер
          у форму нижче:
        </p>
        <form
          id="checkFormRegular"
          className="needs-validation mx-auto form-default mb-4 p-4"
          action="/blank/get"
          method="POST"
          onSubmit={this.formOnSubmit}
          style={{ maxWidth: "25rem" }}
          noValidate
        >
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
                minLength={8}
                maxLength={8}
                pattern="[0-9]{8}"
                invalidFeedback="Введіть правильний номер"
                valueOnChage={this.handleNumberChange}
                required
              />
            </div>
            <small id="_helpBlock" className="form-text text-muted ml-1 mb-3">
              Серія повинна містити лише літери кирилиці.
              <br />
              Кількість літер повинна бути від 2 до 3.
              <br />
              Номер довіреності повинен містити 6 або 7 цифр.
            </small>
          </div>
          <div className="d-flex">
            <button
              className="btn btn-primary mx-auto"
              disabled={this.props.specialForm.isFetching}
              type="submit"
            >
              Перевірити
            </button>
          </div>
        </form>
        {this.state.FetchedDovirenist && (
          <div className="content-bottom col-md-8 mx-auto my-3">
            <h3 className="text-center mb-4">Результат останньої перевірки:</h3>

            <p>
              <b>Дата та час перевірки довіреності</b>:{" "}
              {toFormatedString(this.state.dateCheck)}
            </p>
            {this.state.blank ? (
              <>
                <p>
                  <b>Серія</b>: {this.state.blank.series}
                </p>
                <p>
                  <b>Номер</b>: {this.state.blank.num}
                </p>
              </>
            ) : (
              <p>
                <i>За Вашим запитом не знайдено жодної довіреності</i>
              </p>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

CheckFormPage.propTypes = {
  specialForm: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(
  connect(
    CheckFormPage.mapStateToProps,
    CheckFormPage.mapDispatchToProps
  )(CheckFormPage)
);
