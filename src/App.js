import React, { Component } from 'react';
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import { view as Dashboard } from "inovia-dashboard";
import { connect } from "react-redux";
import EchartsWidget, { BarChartWidget, LineChartWidget, PieChartWidget, MapChartWidget, ScatterChartWidget } from "insight-widgets-echarts";
import { buildFilterSignal } from "insight-widget-api";
import { SimpleAggregationTable, QueryTable } from "insight-widgets-simple";
import { actions } from "inovia-dashboard";
import SettingsIcon from "material-ui/svg-icons/action/settings";
import FloatingActionButton from "material-ui/FloatingActionButton";
import PopOver from "material-ui/Popover";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import moment from "moment";

import "../node_modules/inovia-dashboard/dist/styles.css";
import "../node_modules/inovia-widget-api/dist/styles.css";
import "../node_modules/insight-widget-api/dist/styles.css";
import "../node_modules/insight-shared-components/dist/styles.css";

function mapStoreToProps(store) {
    return {
        dashboard: store.dashboard
    };
}

const widgetMappings = {
    "BarChartWidget": EchartsWidget({ type: "bar", yAxis: { type: "log" } }),
    "LineChartWidgetLog": EchartsWidget({ type: "line", yAxis: { type: "log" } }),
    "LineChartWidget": EchartsWidget({ type: "line"}),
    "PieChartWidget": PieChartWidget,
    "ScatterChartWidget": ScatterChartWidget,
    "SimpleAggregationTable": SimpleAggregationTable,
    "MapChart": MapChartWidget,
    "QueryTable": QueryTable
};

//<Dashboard showControls={false} dashboard={dashboard} widgetMappings={widgetMappings} />
//<LineChartWidget isEditMode={true} settings={dashboard.widgets.get(0).settings} setSetting={this._onUpdateSetting} />

class App extends Component {
    constructor(props) {
        super(props);

        this._onUpdateSetting = this._onUpdateSetting.bind(this);
        this._sendGlobalFilter = this._sendGlobalFilter.bind(this);
        this._toggleTimeSelect = this._toggleTimeSelect.bind(this);
        this._handleFromDateChange = this._handleFromDateChange.bind(this);
        this._handleToDateChange = this._handleToDateChange.bind(this);
        this._confirmTimeSelection = this._confirmTimeSelection.bind(this);

        this.state = {
            showTimeSelect: false,
            showTimeRangeDialog: false
        };
    }

    _sendGlobalFilter(_, value) {
        const { dispatch } = this.props;

        if(value !== "custom")
            dispatch(actions.sendSignalExternal("ALL", buildFilterSignal({ field: "_time", value, operator: "GT" })));
        else
            this.setState({ showTimeRangeDialog: true });
        this.setState({ showTimeSelect: false });
    }

    _handleFromDateChange(_, date) {
        this.setState({ fromDate: date });
    }

    _handleToDateChange(_, date) {
        this.setState({ toDate: date });
    }

    _toggleTimeSelect() {
        this.setState({ showTimeSelect: !this.state.showTimeSelect });
    }

    _confirmTimeSelection() {
        const { dispatch } = this.props,
            { fromDate, toDate } = this.state,
            fromDateFormatted = moment(fromDate).startOf("day").format(),
            toDateFormatted = moment(toDate).endOf("day").format();

        dispatch(
            actions.sendSignalExternal("ALL",
                buildFilterSignal({
                    logic: "AND",
                    filters: [
                        {
                            field: "_time",
                            value: fromDateFormatted,
                            operator: "GTE"
                        },
                        {
                            field: "_time",
                            value: toDateFormatted,
                            operator: "LTE"
                        }
                    ]}
                )
            )
        );
        this.setState({ showTimeRangeDialog: false });
    }

    _onUpdateSetting(setting) {
        const { dispatch, dashboard } = this.props,
            { settings, id } = dashboard.widgets.get(0);

        dispatch(actions.updateWidgetSetting(id, Object.assign({}, settings, setting)));
    }

    render() {
        const { dashboard } = this.props,
            { showTimeSelect, showTimeRangeDialog } = this.state;

        return (
            <div style={{height: "100%"}}>
                <Dashboard showControls={false} dashboard={dashboard} widgetMappings={widgetMappings} />
                <FloatingActionButton
                    secondary={ true }
                    zDepth={3}
                    style={
                        {
                            position: "absolute",
                            bottom: "15px",
                            left: "15px"
                        }
                    }
                    ref={el => this.timeButton = ReactDOM.findDOMNode(el)}
                    onTouchTap={this._toggleTimeSelect}>
                    <SettingsIcon />
                </FloatingActionButton>
                <PopOver onRequestClose={this._toggleTimeSelect} open={showTimeSelect} anchorEl={this.timeButton}>
                    <Menu onChange={this._sendGlobalFilter}>
                        <MenuItem primaryText="custom" value="custom" />
                        <MenuItem primaryText="1DAY" value="1DAY" />
                        <MenuItem primaryText="1WEEK" value="1WEEK" />
                        <MenuItem primaryText="1MONTH" value="1MONTH" />
                        <MenuItem primaryText="6MONTHS" value="6MONTH" />
                        <MenuItem primaryText="12MONTHS" value="12MONTH" />
                    </Menu>
                </PopOver>
                <Dialog open={showTimeRangeDialog} actions={[
                    <FlatButton key={0}
                        label="cancel"
                        secondary={true}
                        onTouchTap={() => this.setState({ showTimeRangeDialog: false})}
                        />,
                    <FlatButton key={1}
                        label="submit"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this._confirmTimeSelection}
                        />
                ]}>
                    <DatePicker mode={"landscape"} maxDate={new Date()} container="inline" hintText="from"
                        value={this.state.fromDate} onChange={this._handleFromDateChange} />
                    <DatePicker mode={"landscape"} maxDate={new Date()} container="inline" hintText="to"
                        value={this.state.toDate} onChange={this._handleToDateChange}  />
                </Dialog>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(App);
