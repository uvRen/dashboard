import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        var simon = [];
        simon.push(["a", "b", "c"]);
        simon.push(["d", "e", "f"]);
        simon.push(["g", "h", "i"]);
        simon.push(["j", "k", "l"]);
        simon[0][0] = "abbe";
        console.log(simon[0][0]);
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h3>Welcome</h3>
                </div>
            </div>
        );
    }
}

export default (Home);
