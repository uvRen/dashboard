import React from 'react';
import ReactDOM from 'react-dom';
import News from './components/News';
import Contact from './components/Contact';
import About from './components/About';
import Home from './components/Home';
import TopMenu from './components/TopMenu';
import injectTapEventPlugin from "react-tap-event-plugin";
import { BrowserRouter as Router, Route } from "react-router-dom";

injectTapEventPlugin();

ReactDOM.render(
    <TopMenu />,
    document.getElementById('menu')
);

ReactDOM.render(
    <Router>
        <Route exact path="/" component={Home} />
        <Route path="/news" component={News} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
    </Router>,
    document.getElementById('root')
);
