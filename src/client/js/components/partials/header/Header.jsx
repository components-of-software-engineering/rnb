import React, { Component } from "react";
import { Link } from 'react-router-dom';
import NavBar from "../../../containers/partials/header/NavBar";

class Header extends Component {
    render() {
        return (
            <header className="navbar">
                <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
                    <Link className="navbar-brand mx-auto ml-md-0 mr-md-3" to="/">
                       
                    </Link>
                    <NavBar />
                </nav>
            </header>
        );
    }
}

export default Header;
