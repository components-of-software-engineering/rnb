import React, { Component } from 'react';
import RegistersTable from '../../containers/registers/RegistersTable';
import { Link } from 'react-router-dom';


class RegistersPage extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Cписок реєстраторів</h1>
                <p>
                    Ви можете зареєструвати нового реєстратора за допомогою форми
                    доступної нижче за посиланням:
                </p>
                <div className="container mb-2 text-center">
                    <Link className={`btn btn-primary my-1 btn-md ml-auto`} to="/registers/signup" role="button">Зареєструвати реєстратора</Link>
                </div>
                <p>
                    Нижче в <i>таблиці</i> наведені всі реєстратори даного реєстру. Кнопка <b>редагувати</b> означає внести зміни до профілю реєстратора,
                    кнопка <b>оновити</b> означає надавання нових ідентифікаторів реєстратору.
                </p>
                <RegistersTable />
            </React.Fragment>
        );
    }
}

export default RegistersPage;