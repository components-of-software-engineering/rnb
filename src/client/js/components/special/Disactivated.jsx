import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Disactivated extends Component {
    render() {
        return (
            <React.Fragment>
                <h1 className="errorPage">Ваш обліковий запис деактивовано адміністратором</h1>
                <p className="errorPage mb-5">Зверніться за детальною інфориацією до адміністратора</p>
            </React.Fragment>
        );
    }
}

export default Disactivated;
