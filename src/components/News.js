import React, { Component } from 'react';


class Home extends Component {
    constructor() {
        super();
        var self = this;
        this.weather = "";
        this.state = {
            text: "Welcome",
            weather: "[empty]"
        }
    }

    // If you want something to be executed when the component is loaded for the first time
    componentDidMount() {

    }

    // If you want something to be executed when the component is updated
    componentDidUpdate() {

    }

    // Change header text
    changeText(e) {
        const text = e.target.value;
        this.setState({ text: text });
    }

    // Render component
    render() {
        console.log(this.state);
        return (
            <div>
                <div className="jumbotron">
                    <h2>{this.state.text}</h2>
                </div>
                <input placeholder="Enter text for header" className="form-control" onChange={this.changeText.bind(this)}></input>
            </div>
        );
    }
}

export default (Home);
