import React, { Component } from "react";
import SpecialFormTable from "./SpecialFormTable";
import { Link } from "react-router-dom";

class SpecialFormsPage extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Cписок довіреностей</h1>
        <p>Ви можете створити нову довіреність</p>
        <div className="container mb-2 text-center">
          <Link
            className={`btn btn-primary my-1 btn-md ml-auto`}
            to="/forms/add"
            role="button"
          >
            Створити довіреність
          </Link>
        </div>
      
        <SpecialFormTable />
      </React.Fragment>
    );
  }
}

export default SpecialFormsPage;
