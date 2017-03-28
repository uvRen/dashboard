import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { compose, createStore } from "redux";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { reducer, actions } from "inovia-dashboard";
import { IntlProvider } from "react-intl";
import axios from "axios";
import echarts from "echarts";
import injectTapEventPlugin from "react-tap-event-plugin";
import { discover } from "inovia-api-client";

injectTapEventPlugin();

const store = compose(createStore)(combineReducers({ dashboard: reducer }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.dispatch(
    actions.replace({
        layout: {
            lg: [{
                x: 0,
                y: 0,
                h: 4,
                w: 8,
                i: "1"
            },{
                x: 8,
                y: 0,
                h: 4,
                w: 4,
                i: "2"
            }],
            sm: [{
                x: 0,
                y: 0,
                h: 3,
                w: 8,
                i: "1"
            },{
                x: 8,
                y: 0,
                h: 4,
                w: 4,
                i: "2"
            }],
            md: [{
                x: 0,
                y: 0,
                h: 3,
                w: 8,
                i: "1"
            },{
                x: 8,
                y: 0,
                h: 4,
                w: 4,
                i: "2"
            }]
        },
        widgets: [{
            id: "1",
            type: "LineChartWidget",
            settings: {
                dataStore: "data-systembolaget-sortiment",
                groupBy: [{ field: "Argang" }, { field: "Forpackning" }],
                queries: [{ name: "AVG", aggregation: "AVG", field: "Alkoholhalt" }, { name: "MAX", aggregation: "MAX", field: "Alkoholhalt" }]
            }
        },
        {
            id: "2",
            type: "PieChartWidget",
            settings: {
                dataStore: "data-systembolaget-sortiment",
                groupBy: [{ field: "Argang" }],
                queries: [{ name: "UNIQUE", aggregation: "UNIQUE", field: "Leverantor" }]
            }
        }
    ]
    })
);

axios.get("/world.json")
    .then(response => response.data)
    .then(map => echarts.registerMap("world", map))
    .then(() => discover("/env.json"))
    .then(() =>
        ReactDOM.render(
            <Provider store={store}>
                <MuiThemeProvider>
                    <IntlProvider locale="en">
                        <App />
                    </IntlProvider>
                </MuiThemeProvider>
            </Provider>,
          document.getElementById('root')
        )
    );
