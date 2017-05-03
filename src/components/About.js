import React, { Component } from 'react';
var http = require('http');

class About extends Component {
    constructor() {
        super();
        var self = this;
        this.weather = "";
        this.state = {
            text: "Welcome",
            weather: "[empty]"
        }
    }
    // Fetch weather data from API
    fetch() {
        var options = {
            host: "api.openweathermap.org",
            path: "/data/2.5/weather?q=Stockholm"
        };
        http.request(options, this.callback).end();
        this.setState({ weather: self.weather });
    }

    // Handle the response from GET Request for weather data
    callback = function (response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            console.log(str);
            self.weather = str;
        });
    }
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h2>About</h2>
                </div>
                <button className="btn" onClick={this.fetch.bind(this)}>Fetch data</button>
                <div className="jumbotron">
                    <h3>
                        Weather
                    </h3>
                    <p>{this.state.weather}</p>
                </div>
            </div>
        );
    }
}

export default (About);
