var data = require('../../public/data.json');
import React, { Component } from 'react';
import Select from 'react-select';
import _ from "lodash";
import 'react-select/dist/react-select.css';

class News extends Component {
    constructor() {
        super();
        var self = this;
        this.state = {
            data: {
                name: "",
                host: "",
                port: "",
                location: ""
            },
            addDevice: {
                name: "",
                host: "",
                port: "",
                location: ""
            },
            options: [],
            text: "Welcome",
            selectedDevice: "",
            selectedName: "Device name",
            selectedHost: "Hostname or IP",
            selectedPort: "Port",
            selectedLocation: "Location"
        }
    }

    // If you want something to be executed when the component is loaded for the first time
    componentDidMount() {
        var options = [];
        _.forEach(data.devices, function(key,value) {
            var id = key.id;
            var name = key.name;
            options.push({ value: id, label: name, object: key});
        });
        this.setState({ options: options, selectedValue: options[0].value});
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

    changeSelect(val) {
        var sel = val.object;
        this.setState({
            selectedValue: val.value,
            selectedName: sel.name,
            selectedHost: sel.host,
            selectedLocation: sel.location,
            selectedPort: sel.port
        });
    }

    addDevice() {
        console.log(data);
        var newData = { devices: [] };
        newData.devices.push(this.state.addDevice);
        
        _.forEach(data.devices, function(val) {
            newData.devices.push(val);
        });
        console.log(JSON.stringify(newData));
        fs.writeFile("../../public/data1.json", JSON.stringify(newData), 'utf8', (err) => {
            if(err) throw err;
            console.log("Success");
        })
    }

    // Update state with the value that the user is typing 
    // Data fetched from "Add a device" - form
    updateInputValue(val) {
        const { target } = val;
        switch(target.name) {
            case "name":
                this.setState({ addDevice: { ...this.state.addDevice, name: target.value } });
                break;
            case "host":
                this.setState({ addDevice: { ...this.state.addDevice, host: target.value } });
                break;
            case "port":
                this.setState({ addDevice: { ...this.state.addDevice, port: target.value } });
                break;
            case "location":
                this.setState({ addDevice: { ...this.state.addDevice, location: target.value } });
                break;
        }
    }

    // Render component
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <center>
                        <h2>Add a device</h2>
                    </center>
                </div>
                <br /><br />

                // ComboBox to select a device
                <div className="row">
                  <div className="col-md-12">
                    <div className="thumbnail">
                      <div className="caption">
                        <h3>Select a device</h3>
                            <Select name="my-dropdown" value={this.state.selectedValue} options={this.state.options} onChange={this.changeSelect.bind(this)}/>
                      </div>
                    </div>
                  </div>
                </div>

                // Form to add a device
                <div className="row">
                  <div className="col-md-6">
                    <div className="thumbnail">
                      <div className="caption">
                        <h3>Add a device</h3>
                            <div className="input-group">
                            <input id="name" name="name" onChange={this.updateInputValue.bind(this)} className="form-control" placeholder="Device name"></input>
                            <span className="input-group-addon"></span>
                        </div>
                        <div className="input-group">
                            <input id="host" name="host" onChange={this.updateInputValue.bind(this)} className="form-control" placeholder="Hostname or IP"></input>
                            <span className="input-group-addon"></span>
                        </div>
                        <div className="input-group">
                            <input id="port" name="port" onChange={this.updateInputValue.bind(this)} className="form-control" placeholder="Port"></input>
                            <span className="input-group-addon"></span>
                        </div>
                        <div className="input-group">
                            <input id="location" name="location" onChange={this.updateInputValue.bind(this)} className="form-control" placeholder="Location"></input>
                            <span className="input-group-addon"></span>
                        </div>
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group">
                                <input type="submit" onClick={this.addDevice.bind(this)} value="Add" name="submit" className="btn btn-default"></input>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  // Form that display data about a selected device
                  <div className="col-md-6">
                    <div className="thumbnail">
                      <div className="caption">
                        <h3>Update data for a device</h3>
                        <div className="input-group">
                            <input id="textfieldName" onChange={this.handleTextFieldChange.bind(this)} type="text" className="form-control" placeholder={this.state.selectedName} aria-describedby="basic-addon2"></input>
                            <span className="input-group-addon"></span>
                        </div>
                        <div className="input-group">
                            <input id="textfieldHost" onChange={this.handleTextFieldChange.bind(this)} type="text" className="form-control" placeholder={this.state.selectedHost} aria-describedby="basic-addon1"></input>
                            <span className="input-group-addon"></span>
                        </div>
                        <div className="input-group">
                            <input id="textfieldPort" onChange={this.handleTextFieldChange.bind(this)} type="text" className="form-control" placeholder={this.state.selectedPort} aria-describedby="basic-addon1" ></input>
                            <span className="input-group-addon"></span>
                        </div>
                        <div className="input-group">
                            <input id="textfieldLocation" onChange={this.handleTextFieldChange.bind(this)} type="text" className="form-control" placeholder={this.state.selectedLocation}></input>
                            <span className="input-group-addon"></span>
                        </div>
                        <div className="btn-group btn-group-justified">
                            <div className="btn-group">
                                <input type="submit" value="Update" name="submit" className="btn btn-default"></input>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default (News);
