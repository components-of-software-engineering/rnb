import React, { Component } from 'react';
import SpecialFormTable from './SpecialFormTable';
import { Link } from 'react-router-dom';


class SpecialFormsPage extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Cписок витрачених юланків</h1>
                <p>
                    Ви можете зареєструвати новий звіт витрачання бланків
                </p>
                <div className="container mb-2 text-center">
                    <Link className={`btn btn-primary my-1 btn-md ml-auto`} to="/forms/add" role="button">Додати новий звіт витрачання</Link>
                </div>
                <p>Нижче в <i>таблиці</i> наведені всі витрачені бланки, зареєстровані Вами:</p>
                <SpecialFormTable />
            </React.Fragment>
        );
    }
}

export default SpecialFormsPage;