import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getAllRegisters } from '../../actions/registers';
import { disableRegister } from '../../actions/user';
import { toFormatedString } from '../../utils/dateConversion';
import { isAdministrator, isRegister } from '../../utils/service';
import NavPagination from '../../components/partials/paginator/NavPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserCog } from '@fortawesome/free-solid-svg-icons';
import ModalDialog from '../../components/partials/modals/ModalDialog';
import $ from 'jquery';
import Input from '../../components/partials/form_elements/Input';
import { toValueHtmlString } from '../../utils/dateConversion';

class RegistersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            status: null,
            dateReg: "",
            dateUpd: ""
        };
        this.showRowsOfUsers = this.showRowsOfUsers.bind(this);
        this.handleClickNavigation = this.handleClickNavigation.bind(this);
        this.handleDisable = this.handleDisable.bind(this);
    }

    viewIcon(role) {
        if (isAdministrator(role)) {
            return <span><FontAwesomeIcon icon={faStar} className="ml-1" /></span>;
        } else if (isRegister(role)) {
            return <span><FontAwesomeIcon icon={faUserCog} className="ml-1" /></span>;
        }
        return false;
    }

    handleFieldChange(field) {
        const this_obj = this;
        return function(e) {
            const obj = {};
            if (typeof e.currentTarget.value === "undefined") {
                return;
            }
            obj[field] = e.currentTarget.value;
            this_obj.setState(obj);
        };
    }

    static mapStateToProps(store) {
        return { registers: store.registers };
    }

    static mapDispatchToProps(dispatch) {
        return { 
            getAllRegisters: () => dispatch(getAllRegisters()),
            disableRegister: (username, status = false, name = '') => dispatch(disableRegister(username, status, name))
        };
    }

    componentDidMount() {
        if (!this.props.registers.isFetching) {
            this.props.getAllRegisters();
        }
    }

    handleDisable(e) {
        if (!this.props.registers.isFetching) {
            e.preventDefault();
            $(`#modalDialog-${e.currentTarget.username.value}`).modal('toggle');
            this.props.disableRegister(e.currentTarget.username.value, e.currentTarget.status.value === "true", e.currentTarget.name.value);
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
                        <form className="mx-auto" style={{display: regitser.status ? "inline-flex " : "flex"}} onSubmit={this.handleDisable} >
                            <input name="username" value={regitser.id} type="hidden"/>
                            <input name="status" value={!regitser.status} type="hidden"/>
                            <input name="name" value={regitser.username} type="hidden"/>
                            <button className={`btn mx-auto btn-outline-${regitser.status ? "danger" : "primary"} my-1 mx-1 btn-sm`} data-toggle="modal" data-target={`#modalDialog-${regitser.username}`} type="button">{regitser.status ? "Деактивувати" : "Активувати"}</button>
                            <ModalDialog keyId={regitser.username} dangerColor={regitser.status } isFetching={this.props.registers.isFetching} titleModal={`Підтвердження ${regitser.status ? "де" : ""}активації`} textModal={`Ви впевнені, що хочете ${regitser.status ? "де" : ""}активувати реєстратора ${regitser.username}?`} actionModal={`${regitser.status ? "Деа" : "А"}ктивувати`} />
                        </form>
                        {regitser.status &&
                            <>
                                <Link className={`btn btn-outline-primary my-1 mx-1 btn-sm`} to={`/registers/edit/${regitser.username}`} role="button">Редагувати</Link>
                                <Link className={`btn btn-outline-primary my-1 mx-1 btn-sm`} to={`/registers/update/${regitser.username}`} role="button">Оновити</Link>
                            </>
                        }
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
    function sameDay(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
        }
        let registers = this.props.registers?.registersObject;
        if (this.state.name.length > 2) {
            registers = registers?.filter(x => x.name.toLowerCase().includes(this.state.name.toLowerCase()));
        }
        if (this.state.username.length > 4) {
            registers = registers?.filter(x => x.username.toLowerCase().includes(this.state.username.toLowerCase()));
        }
        if (this.state.status != null && this.state.status !== "будь-який статус") {
            registers = registers?.filter(x => x.status === (this.state.status === "активований"));
        }
        if (this.state.dateReg != "") {
            registers = registers?.filter(x => sameDay(new Date(x.date_registration), new Date(this.state.dateReg)));
        }
        if (this.state.dateUpd != "") {
            registers = registers?.filter(x => sameDay(new Date(x.date_registration), new Date(this.state.dateUpd)));
        }


        if (this.props.registers.registersObject === null && !this.props.registers.error) {
            return this.singleRowInfo("Завантаження даних");
        } else if (this.props.registers.error) {
            return this.singleRowInfo("Сталася помилка під час завантаження");
        } else if (Array.isArray(this.props.registers.registersObject) && registers.length === 0) {
            return this.singleRowInfo("В реєстрі немає жодного користувача");
        } else if (Array.isArray(this.props.registers.registersObject) && registers.length > 0) {
            return this.registerRow(registers);
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
                    <div className="form-group form-inline ">
                        <Input 
                            type="text"
                            name="name"
                            label="Повне ім'я"
                            minLength={3}
                            maxLength={30}
                            invalidFeedback="Введіть правильне ім'я"
                            helpInfo="Ім'я повинно мати довжину від 3 до 30 символів включно"
                            valueOnChage={this.handleFieldChange("name")}
                            formInline
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            type="text"
                            name="username"
                            label="Логін"
                            minLength={5}
                            maxLength={20}
                            helpInfo="від 5 до 20 символів, складається з A-Z, a-z, 0-9 та _"
                            invalidFeedback={this.state.loginErrorMessage}
                            pattern="[A-Za-z_0-9]{5,20}"
                            valueOnChage={this.handleFieldChange("username")}
                            formInline
                            value={this.state.username}
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            type={"select"}
                            name="status"
                            label="Статус"
                            formInline
                            value={this.state.status}
                            optionNotSelectedText={"виберіть статус"}
                            options={[ 
                                {selectvalue: true, name: "активований"}, 
                                {selectvalue: false, name: "деактивований"},
                                {selectvalue: null, name: "будь-який статус"},
                            ]}
                            valueOnChage={this.handleFieldChange("status")}
                            formInline
                            value={this.state.status}
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            type="date"
                            name="dateReg"
                            label="Дата реєстрації"
                            valueOnChage={this.handleFieldChange("dateReg")}
                            value={toValueHtmlString(this.state.dateReg)}
                            formInline
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            type="date"
                            name="dateUpd"
                            label="Дата оновлення"
                            valueOnChage={this.handleFieldChange("dateUpd")}
                            value={toValueHtmlString(this.state.dateUpd)}
                            formInline
                        />
                    </div>
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
