import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Input from '../../components/partials/form_elements/Input';
import { getInfoAboutNotarius } from '../../actions/notarius';
import { onSubmitFormValidation, onMountedForm } from '../../utils/validtion';
import { toFormatedString } from '../../utils/dateConversion';

class NotariesInfo extends Component {

    static mapStateToProps(store) {
        return { notarius: store.notarius };
    }

    static mapDispatchToProps(dispatch) {
        return { getInfoAboutNotarius: (id) => dispatch(getInfoAboutNotarius(id)) };
    }

    componentDidMount() {
        onMountedForm();
        this.props.getInfoAboutNotarius(this.props.match.params.id);
    }

    render() {
        const not = this?.props?.notarius?.notariusObject;
        return (
            <React.Fragment>
                <h1>Детальна інформація про нотаріус</h1>
                {not &&
                    <div className="content-bottom col-md-8 mx-auto my-3">
                        <p>
                            <b>Тип</b>: {not.type ? "Державний" : "Приватний" }<br/>
                            <b>{not.type ? "Назва" : "Ім'я"}</b>: {not.type ? not.name_organization : not.name }<br/>
                            <b>Статус</b>: {not.status}<br/>
                            <b>Дата останньої зміни статусу</b>: {toFormatedString(not.date_status_update)}<br/>
                            <b>Регіон</b>: {not.region}<br/>
                            <b>Місцезнаходження</b>: {not.location}<br/>
                            <b>Контактні дані</b>: {not.contacts}<br/>
                            {!!not.additional_info && <><b>Додаткові відомості</b>: {not.additional_info}<br/></>}
                            <b>Нотаріальний округ</b>: {not.notarius_region}<br/>
                            {not.type ?
                                <>
                                    <b>Дата реєстрації нотаріального округу</b>: {toFormatedString(not.date_reg_region)}<br/>
                                </>
                            :
                                <>
                                    <b>Номер свідоцтва</b>: {not.num_certificate}<br/>
                                    <b>Номер реєстраційного посвідчення</b>: {not.num_card}<br/>
                                    <b>Дата видачі свідоцтва</b>: {toFormatedString(not.date_issue_certificate)}<br/>
                                    <b>Дата видачі реєстраційного посвідчення</b>: {toFormatedString(not.date_issue_card)}<br/>
                                </>
                            }
                        </p>
                    </div>
                }
            </React.Fragment>
        );
    }
}

NotariesInfo.propTypes = {
    specialForm: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withRouter(connect(NotariesInfo.mapStateToProps, NotariesInfo.mapDispatchToProps)(NotariesInfo));
