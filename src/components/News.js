import React, { Component } from 'react';


class Home extends Component {
    constructor() {
        super();
        var self = this;
        this.state = {
            data: {
                host: "",
                port: "",
                name: "",
                location: "",
            }
            
        }
    }

    // If you want something to be executed when the component is loaded for the first time
    componentDidMount() {

    }

    // If you want something to be executed when the component is updated
    componentDidUpdate() {

    }

    // Update state when textfield's value are changed
    handleTextFieldChange(e) {
        switch (e.target.id) {
            case "textfieldHost":
                this.setState({ data: { ...this.state.data, host: e.target.value } })
                break;
            case "textfieldPort":
                this.setState({ data: { ...this.state.data, port: e.target.value } })
                break;
            case "textfieldName":
                this.setState({ data: { ...this.state.data, name: e.target.value } })
                break;
            case "textfieldLocation":
                this.setState({ data: { ...this.state.data, location: e.target.value } })
                break;
        }
    }

    // When user press 'Save'. For now, just print original data and JSON
    submit() {
        console.log(this.state.data);
        console.log(JSON.stringify(this.state.data));
    }

    // Render component
    render() {
        var divStyleInner = {
            width: "50%",
            align: "center",
            display: "inline-block",
        };
        var divStyleOuter = {
            "text-align": "center",
        }

        return (
            <div>
                <div className="jumbotron">
                    <center>
                        <h2>Add a device</h2>
                    </center>
                </div>
                <br /><br />
                <div style={divStyleOuter}> 
                    <div style={divStyleInner}>
                        <div className="input-group">
                            <input id="textfieldHost" onChange={this.handleTextFieldChange.bind(this)} type="text" className="form-control" placeholder="Hostname or IP" aria-describedby="basic-addon1"></input>
                            <span className="input-group-addon" id="basic-addon1">@</span>
                            <input id="textfieldPort" onChange={this.handleTextFieldChange.bind(this)} type="text" className="form-control" placeholder="Port" aria-describedby="basic-addon1" ></input>
                            <span className="input-group-addon"></span>
                        </div>
                        <br />
                        <div className="input-group">
                            <input id="textfieldName" onChange={this.handleTextFieldChange.bind(this)} type="text" className="form-control" placeholder="Device name" aria-describedby="basic-addon2"></input>
                            <span className="input-group-addon"></span>
                        </div>
                        <br />
                        <div className="input-group">
                            <input id="textfieldLocation" onChange={this.handleTextFieldChange.bind(this)} type="text" className="form-control" placeholder="Location"></input>
                            <span className="input-group-addon"></span>
                        </div>
                        <br />
                        <div className="btn-group btn-group-justified" role="group">
                            <div className="btn-group">
                                <button onClick={this.submit.bind(this)} className="btn btn-default">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (Home);
