import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getAllRegisters } from '../../actions/registers';
import { toFormatedString } from '../../utils/dateConversion';
import { isAdministrator, isRegister } from '../../utils/service';
import NavPagination from '../../components/partials/paginator/NavPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserCog } from '@fortawesome/free-solid-svg-icons';
import ModalDialog from '../../components/partials/modals/ModalDialog';

class RegistersTable extends Component {
    constructor(props) {
        super(props);
        this.showRowsOfUsers = this.showRowsOfUsers.bind(this);
        this.handleClickNavigation = this.handleClickNavigation.bind(this);
    }

    viewIcon(role) {
        if (isAdministrator(role)) {
            return <span><FontAwesomeIcon icon={faStar} className="ml-1" /></span>;
        } else if (isRegister(role)) {
            return <span><FontAwesomeIcon icon={faUserCog} className="ml-1" /></span>;
        }
        return false;
    }

    static mapStateToProps(store) {
        return { registers: store.registers };
    }

    static mapDispatchToProps(dispatch) {
        return { 
            getAllRegisters: () => dispatch(getAllRegisters())
        };
    }

    componentDidMount() {
        if (!this.props.registers.isFetching) {
            this.props.getAllRegisters();
        }
    }

    registerRow(registers) {
        return registers.map(regitser => {
            return (
                <tr key={regitser.username}>
                    <td><Link className="link-style text-nowrap" to={`#`}>{regitser.username}</Link></td>
                    <td><Link className="link-style text-nowrap" to={`#`}>{regitser.name}</Link></td>
                    <td className="text-nowrap">{toFormatedString(regitser.date_last_update)}</td>
                    <td className="text-nowrap">{toFormatedString(regitser.date_registration)}</td>
                    <td className="text-nowrap">{regitser.status ? "Активований" : "Деактивований"}</td>
                    <td className="text-nowrap">
                        <form style={{display: "inline-flex"}} onSubmit={this.onDeleteInvoice} >
                            <button className={`btn btn-outline-danger my-1 mx-1 btn-sm`} data-toggle="modal" data-target="#modalDialog" role="button">Деактивувати</button>
                            <ModalDialog dangerColor={true} isFetching={this.props.registers.isFetching} titleModal="Підтвердження видалення" textModal="Ви впевнені, що хочете видалити цю накладну?" actionModal="Видалити" />
                        </form>
                        <Link className={`btn btn-outline-primary my-1 mx-1 btn-sm`} to="/registers/disactivate" role="button">Редагувати</Link>
                        <Link className={`btn btn-outline-primary my-1 mx-1 btn-sm`} to="/registers/disactivate" role="button">Оновити</Link>
                    </td>
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
        if (this.props.registers.registersObject === null && !this.props.registers.error) {
            return this.singleRowInfo("Завантаження даних");
        } else if (this.props.registers.error) {
            return this.singleRowInfo("Сталася помилка під час завантаження");
        } else if (Array.isArray(this.props.registers.registersObject) && this.props.registers.registersObject.length === 0) {
            return this.singleRowInfo("В реєстрі немає жодного користувача");
        } else if (Array.isArray(this.props.registers.registersObject) && this.props.registers.registersObject.length > 0) {
            return this.registerRow(this.props.registers.registersObject);
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
                    <p>
                        Фільтрувати дані можна за такими полями:
                    </p>

                    <Link className={`btn btn-primary my-1 mx-1 btn`} to="#" role="button">Фільтрувати</Link>
                </div>
                <div className="table-responsive p-3">
                    <table className="mx-auto mb-4 styled mr-3" id="registers">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Повне ім&#39;я</th>
                                <th>Дата реєстрації</th>
                                <th>Дата оновлення</th>
                                <th>Статус</th>
                                <th>Дії</th>
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

RegistersTable.propTypes = {
    registers: PropTypes.object.isRequired,
    getAllRegisters: PropTypes.func.isRequired  
};

export default withRouter(connect(RegistersTable.mapStateToProps, RegistersTable.mapDispatchToProps)(RegistersTable));
