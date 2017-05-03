import React, { Component } from "react";
import { Link } from "react-router-dom";

class TopMenu extends Component {
    render() {
        return (
            <div>
                <ul className="nav nav-pills nav-justified">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
        );
    }
}

export default (TopMenu);