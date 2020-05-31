import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import JumbotronButtonsBlock from "../../components/index/JumbotronButtonBlock";

class Jumbotron extends Component {
  static mapStateToProps(store) {
    return { user: store.user };
  }

  render() {
    const { user } = this.props;
    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-4 my-auto text-center d-none d-xl-block d-lg-block">
            <img
              className="img-fluid w-100 logo-img"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a8/%D0%A2%D1%80%D0%B8%D0%B7%D1%83%D0%B1.svg"
              alt="Rapid Delivery logo"
              width="192"
            />
          </div>
          <div
            className="col"
            style={{
              display: "flex",
              alignItems: "centere",
              flexDirection: "column",
              justifyContent: "center",
              color: "white",
            }}
          >
            <h1 className="display-4">
              Єдиний Реєстр Ноторіальних Довіреностей{" "}
            </h1>
            <p className="lead">
              Даний сайт надає можливість <i>звичайним користувачам</i>{" "}
              здійснити перевірку довіреностей за серією та номером
            </p>
            <hr className="my-4" />
            <JumbotronButtonsBlock user={user} />
          </div>
        </div>
      </div>
    );
  }
}

Jumbotron.propTypes = {
  user: PropTypes.object.isRequired,
};

export default withRouter(connect(Jumbotron.mapStateToProps)(Jumbotron));
