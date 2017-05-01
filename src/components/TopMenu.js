import React, { Component } from "react";



class TopMenu extends Component {
    render() {
        return (
            <div>
                <ul className="nav nav-pills nav-justified">
                    <li className="presentation">Home</li>
                    <li className="presentation"><a href="">News</a></li>
                    <li className="presentation"><a href="">About</a></li>
                    <li className="presentation"><a href="">Contact</a></li>
                </ul>
            </div>
        );
    }
}

export default (TopMenu);