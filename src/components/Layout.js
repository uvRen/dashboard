import News from './News';
import Contact from './Contact';
import About from './About';
import Home from './Home';
import TopMenu from './TopMenu';
import Header from './Header';
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';

class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Welcome"
        }
    }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <TopMenu />
                    <Route exact path="/" component={Home} />
                    <Route path="/news" component={News} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                </div>
            </Router>
        );
    }
}

export default (Layout);