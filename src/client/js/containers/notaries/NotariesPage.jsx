import React, { Component } from 'react';
import NotariesTable from './NotariesTable';
import { Link } from 'react-router-dom';


class NotariesPage extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Cписок нотаріусів</h1>
                <p>
                    Ви можете переглянути детальну інформацію про кожного нотаріуса, натиснувши
                    на відповідне посилання в таблиці нижче:
                </p>
                <NotariesTable />
            </React.Fragment>
        );
    }
}

export default NotariesPage;
