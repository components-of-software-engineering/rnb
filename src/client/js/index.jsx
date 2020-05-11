import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from  './components/App';
import ScrollToTop from './containers/special/ScrollToTop';
import store from './configs/configureReduxStore';
import history from './configs/configureRouterHistory';

const root = (
    <Provider store={store}>
        <BrowserRouter>
            <Router history={history}>
                <ScrollToTop/>
                <App />
            </Router>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
