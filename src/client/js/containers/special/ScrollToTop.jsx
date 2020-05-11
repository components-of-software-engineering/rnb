import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return null;
    }
}

ScrollToTop.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string
    })
};

export default withRouter(ScrollToTop);
