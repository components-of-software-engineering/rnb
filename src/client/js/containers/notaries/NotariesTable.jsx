import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getAllNotarius } from '../../actions/notarius';
import { toFormatedString } from '../../utils/dateConversion';
import { isAdministrator, isRegister } from '../../utils/service';
import NavPagination from '../../components/partials/paginator/NavPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserCog } from '@fortawesome/free-solid-svg-icons';
import ModalDialog from '../../components/partials/modals/ModalDialog';
import $ from 'jquery';
import Input from '../../components/partials/form_elements/Input';
import { toValueHtmlString } from '../../utils/dateConversion';

class NotariesTable extends Component {
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
        return { notarius: store.notarius };
    }

    static mapDispatchToProps(dispatch) {
        return { 
            getAllNotarius: () => dispatch(getAllNotarius()),
        };
    }

    componentDidMount() {
        if (!this.props.notarius.isFetching) {
            this.props.getAllNotarius();
        }
    }

    registerRow(notarius) {
        return notarius.map(notarius => {
            return (
                <tr key={notarius.username}>
                    <td><Link className="link-style text-nowrap" to={`/notaries/${notarius.id}`}>{notarius.id}</Link></td>
                    <td className="text-nowrap">{notarius.type ? "Державний" : "Приватний"}</td>
                    <td><Link className="link-style text-nowrap" to={`/notaries/${notarius.id}`}>{notarius.type ? notarius.name_organization : notarius.name }</Link></td>
                    <td className="text-nowrap">{notarius.status}</td>
                    <td className="text-nowrap">{notarius.location}</td>
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
        let notarius = this.props.notarius?.notariusObjectAll;
        if (this.state.name.length > 2) {
            notarius = notarius?.filter(x => {
                const y = x.type ? x.name_organization : x.name;
                return y.toLowerCase().includes(this.state.name.toLowerCase())
            });
        }
        if (this.state.username.length > 2) {
            notarius = notarius?.filter(x => x.location.toLowerCase().includes(this.state.username.toLowerCase()));
        }
        if (this.state.status != null && this.state.status !== "будь-який тип") {
            notarius = notarius?.filter(x => x.type === (this.state.status === "державний"));
        }


        if (this.props.notarius.notariusObjectAll === null) {
            return this.singleRowInfo("Завантаження даних");
        } else if (Array.isArray(this.props.notarius.notariusObjectAll) && notarius.length === 0) {
            return this.singleRowInfo("В реєстрі немає жодного нотаріуса");
        } else if (Array.isArray(this.props.notarius.notariusObjectAll) && notarius.length > 0) {
            return this.registerRow(notarius);
        } else {
            return this.singleRowInfo("Завантаження даних");
        }
    }

    handleClickNavigation(e) {
        if (!this.props.notarius.isFetching) {
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
                            label="Назва/Ім'я"
                            minLength={3}
                            maxLength={40}
                            valueOnChage={this.handleFieldChange("name")}
                            formInline
                            value={this.state.name}
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            type="text"
                            name="username"
                            label="Регіон"
                            minLength={3}
                            maxLength={50}
                            valueOnChage={this.handleFieldChange("username")}
                            formInline
                            value={this.state.username}
                        />
                    </div>
                    <div className="form-group form-inline ">
                        <Input 
                            type={"select"}
                            name="status"
                            label="Тип"
                            formInline
                            value={this.state.status}
                            optionNotSelectedText={"виберіть тип"}
                            options={[ 
                                {selectvalue: true, name: "державний"}, 
                                {selectvalue: false, name: "приватний"},
                                {selectvalue: null, name: "будь-який тип"},
                            ]}
                            valueOnChage={this.handleFieldChange("status")}
                            formInline
                            value={this.state.status}
                        />
                    </div>
                </div>
                <div className="table-responsive p-3">
                    <table className="mx-auto mb-4 styled mr-3" id="notarius">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Тип</th>
                                <th>Назва/Ім'я</th>
                                <th>Статус</th>
                                <th>Регіон</th>
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

NotariesTable.propTypes = {
    notarius: PropTypes.object.isRequired,
    getAllRegisters: PropTypes.func.isRequired  
};

export default withRouter(connect(NotariesTable.mapStateToProps, NotariesTable.mapDispatchToProps)(NotariesTable));
