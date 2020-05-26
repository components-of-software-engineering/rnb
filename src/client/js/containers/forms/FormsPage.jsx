import React, { Component } from 'react';
import SpecialFormTable from './SpecialFormTable';
import { Link } from 'react-router-dom';


class FormsPage extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Cписок спеціальних бланків нотаріальних документів</h1>
                <p>
                    Ви можете зареєструвати факт отримання бланків певним нотаріусом
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

export default FormsPage;