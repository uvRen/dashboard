import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import injectTapEventPlugin from "react-tap-event-plugin";
import { BrowserRouter as Router, Route } from "react-router-dom";

injectTapEventPlugin();


ReactDOM.render(
    <Layout />,
    document.getElementById('root')
);
