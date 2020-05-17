import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import JumbotronButtonsBlock from '../../components/index/JumbotronButtonBlock';

class Jumbotron extends Component {
    static mapStateToProps(store) {
        return { user: store.user };
    }

    render() {
        const { user } = this.props;
        return (
            <div className="jumbotron">
                <div className="row">
                    <div className="col-4 my-auto text-center d-none d-xl-block d-lg-block">
                        <img className="img-fluid w-100 logo-img" src="/assets/images/logo.png" alt="Rapid Delivery logo" width="192"/>
                    </div>
                    <div className="col">
                        <h1 className="display-4">RNB</h1>
                        <h2>Єдиний реєстр</h2>
                        <h3>спеціальних бланків нотаріальних документів</h3>
                        <p className="lead">
                            Даний сайт надає можливість <i>звичайним користувачам</i> здійснити
                            перевірку спеціального бланка нотаріального документа за його
                            <b> серією</b> та <b>номером</b>. Таким чином можна дізнатися 
                            про <b>дату</b> та <b>код витрачання</b> бланка.
                        </p>
                        <hr className="my-4"/>
                        <JumbotronButtonsBlock user={user} />                    
                    </div>
                </div>
            </div>
        );
    }
}

Jumbotron.propTypes = {
    user: PropTypes.object.isRequired,
};

export default withRouter(connect(Jumbotron.mapStateToProps)(Jumbotron));