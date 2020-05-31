import React, { Component } from "react";
import RegistersTable from "../../containers/registers/RegistersTable";
import { Link } from "react-router-dom";

class RegistersPage extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center", color: "#b1b93c" }}>
          Cписок нотаріусів
        </h1>

        <div className="container mb-2 text-center">
          <Link
            className={`btn btn-primary my-1 btn-md ml-auto`}
            to="/registers/signup"
            role="button"
          >
            Зареєструвати нотаріуса
          </Link>
        </div>
        <p>
          Нижче в <i>таблиці</i> наведені всі нотаріуси Єдиного Реєстру
          Довіреностей. Кнопка <b>редагувати</b> означає внести зміни до профілю
          нотаріуса, кнопка <b>оновити</b> означає надавання нових
          ідентифікаторів нотаріуса.
        </p>
        <RegistersTable />
      </React.Fragment>
    );
  }
}

export default RegistersPage;
