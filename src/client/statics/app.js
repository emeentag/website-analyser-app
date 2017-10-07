import scss from './css/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './js/store';
import Layout from './js/components/Layout';


ReactDOM.render(
    <Provider store={ store }><Layout /></Provider>,
    document.getElementById('app')
);