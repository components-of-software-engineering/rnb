import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getAllRegisters } from "../../actions/registers";
import { updateInfoAboutMe } from "../../actions/user";
import { disableRegister } from "../../actions/user";
import { toFormatedString } from "../../utils/dateConversion";
import { isAdministrator, isRegister } from "../../utils/service";
import NavPagination from "../../components/partials/paginator/NavPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUserCog } from "@fortawesome/free-solid-svg-icons";
import ModalDialog from "../../components/partials/modals/ModalDialog";
import $ from "jquery";
import { format } from "date-fns";

import Input from "../../components/partials/form_elements/Input";
import url from "url";
import { authorizationHeaders, formDataToJson } from "./../../utils/service";

class SpecialFormTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      blanksArr: null,
    };
    this.showRowsOfUsers = this.showRowsOfUsers.bind(this);
    this.handleClickNavigation = this.handleClickNavigation.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    props.updateInfoAboutMe();
  }

  viewIcon(role) {
    if (isAdministrator(role)) {
      return (
        <span>
          <FontAwesomeIcon icon={faStar} className="ml-1" />
        </span>
      );
    } else if (isRegister(role)) {
      return (
        <span>
          <FontAwesomeIcon icon={faUserCog} className="ml-1" />
        </span>
      );
    }
    return false;
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

  static mapStateToProps(store) {
    return { registers: store.registers, user: store.user };
  }

  static mapDispatchToProps(dispatch) {
    return {
      updateInfoAboutMe: () => dispatch(updateInfoAboutMe()),
      getAllRegisters: () => dispatch(getAllRegisters()),
      disableRegister: (username, status = false) =>
        dispatch(disableRegister(username, status)),
    };
  }

  async componentDidMount() {
    if (!this.props.registers.isFetching) {
      this.props.getAllRegisters();
    }
    const jwt = localStorage.getItem("jwt");
    const reqOptions = authorizationHeaders(jwt);
    reqOptions.method = "POST";
    reqOptions.headers["Content-Type"] = "application/json";
    reqOptions.body = JSON.stringify({});
    let response, respBody, statusCode;
    let error = null;
    try {
      response = await fetch(`/blank/get_all`, reqOptions);
      statusCode = response.status;
      if (!response.ok) throw new Error(response.statusText);
      respBody = await response.json();
    } catch (e) {
      error = e;
    }
    console.log(respBody);
    console.log(this.props.user.userObject.id);

    const reqOptions1 = authorizationHeaders(jwt);
    reqOptions1.method = "POST";
    reqOptions1.headers["Content-Type"] = "application/json";
    reqOptions1.body = JSON.stringify({});
    let response1, respBody1, statusCode1;
    let error1 = null;
    try {
      response1 = await fetch(`/usages_register/get_all`, reqOptions1);
      statusCode1 = response.status;
      if (!response1.ok) throw new Error(response1.statusText);
      respBody1 = await response1.json();
    } catch (e) {
      error1 = e;
    }
    console.log(respBody1);
    const rrrr = respBody.blanks.filter(
      (x) => x.notarius_id === this.props.user.userObject.id
    );

    this.setState({
      blanksArr: rrrr,
    });
    //
  }

  handleDisable(e) {
    if (!this.props.registers.isFetching) {
      e.preventDefault();
      $(`#modalDialog-${e.currentTarget.username.value}`).modal("toggle");
      this.props.disableRegister(
        e.currentTarget.username.value,
        e.currentTarget.status.value === "true"
      );
      this.props.getAllRegisters();
    }
  }

  registerRow(registers) {
    console.log(registers);
    return registers.map((regitser1) => {
      console.log("!!!!!!!!!");
      console.log(regitser1);
      const hmmm = regitser1;
      return (
        <tr key={hmmm.id}>
          <td>
            <Link className="link-style text-nowrap" to={`#`}>
              {hmmm.series}
            </Link>
          </td>
          <td>
            <Link className="link-style text-nowrap" to={`#`}>
              {hmmm.num}
            </Link>
          </td>
          <td>{hmmm.fullname}</td>
          <td>{format(new Date(hmmm.date_receiving), "dd/MM/yyyy")}</td>
          <td className="text-nowrap">{hmmm.notarius_id}</td>
          {/* <td className="text-nowrap">{regitser.status ? "Активований" : "Деактивований"}</td>
                    <td className="text-nowrap">
                        <form className="mx-auto" style={{display: regitser.status ? "inline-flex " : "flex"}} onSubmit={this.handleDisable} >
                            <input name="username" value={regitser.username} type="hidden"/>
                            <input name="status" value={!regitser.status} type="hidden"/>
                            <button className={`btn mx-auto btn-outline-${regitser.status ? "danger" : "primary"} my-1 mx-1 btn-sm`} data-toggle="modal" data-target={`#modalDialog-${regitser.username}`} type="button">{regitser.status ? "Деактивувати" : "Активувати"}</button>
                            <ModalDialog keyId={regitser.username} dangerColor={regitser.status } isFetching={this.props.registers.isFetching} titleModal={`Підтвердження ${regitser.status ? "де" : ""}активації`} textModal={`Ви впевнені, що хочете ${regitser.status ? "де" : ""}активувати реєстратора ${regitser.username}?`} actionModal={`${regitser.status ? "Деа" : "А"}ктивувати`} />
                        </form>
                        {regitser.status &&
                            <>
                                <Link className={`btn btn-outline-primary my-1 mx-1 btn-sm`} to={`/registers/edit/${regitser.username}`} role="button">Редагувати</Link>
                                <Link className={`btn btn-outline-primary my-1 mx-1 btn-sm`} to={`/registers/update/${regitser.username}`} role="button">Оновити</Link>
                            </>
                        }
                    </td> */}
        </tr>
      );
    });
  }

  singleRowInfo(info) {
    return (
      <tr>
        <td colSpan="6">
          <span className="informal">{info}</span>
        </td>
      </tr>
    );
  }

  showRowsOfUsers() {
    if (this.state.blanksArr === null && !this.props.registers.error) {
      return this.singleRowInfo("Завантаження даних");
    } else if (this.props.registers.error) {
      return this.singleRowInfo("Сталася помилка під час завантаження");
    } else if (
      Array.isArray(this.state.blanksArr) &&
      this.state.blanksArr.length === 0
    ) {
      return this.singleRowInfo("В реєстрі немає жодного користувача");
    } else if (
      Array.isArray(this.state.blanksArr) &&
      this.state.blanksArr.length > 0
    ) {
      let registers = this.state.blanksArr;
      if (this.state.name.length > 2) {
        registers = registers.filter((x) =>
          x.name.toLowerCase().includes(this.state.name.toLowerCase())
        );
      }
      return this.registerRow(registers);
    } else {
      return this.singleRowInfo("Завантаження даних");
    }
  }

  handleClickNavigation(e) {
    if (!this.props.registers.isFetching) {
      const page = e.currentTarget.getAttribute("data-page");
      if (!page) return;
      this.props.getAllRegisters(page);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div>
          {/* <p>
                        Фільтрувати дані можна за такими полями:
                    </p>
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
                    </div> */}
        </div>
        <div className="table-responsive p-3">
          <table className="mx-auto mb-4 styled mr-3" id="registers">
            <thead>
              <tr>
                <th>Серія</th>
                <th>Номер</th>
                <th>Кому видана</th>
                <th>Дійсна до</th>
                <th>Нотаріус</th>
              </tr>
            </thead>
            <tbody>
              <this.showRowsOfUsers />
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

SpecialFormTable.propTypes = {
  registers: PropTypes.object.isRequired,
  getAllRegisters: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    SpecialFormTable.mapStateToProps,
    SpecialFormTable.mapDispatchToProps
  )(SpecialFormTable)
);
