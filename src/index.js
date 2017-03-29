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
                dataStore: "jenkins-emca-ide-kpi-test",
                groupBy: [{ field: "_time", interval: "1day" }],
                queries: [{ name: "importSmallProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importSmallProjectTest"}]}},
 			  { name: "importMediumProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importMediumProjectTest"}]}},
 			  { name: "importLargeProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importLargeProjectTest"}]}},
 			  { name: "Unknown6", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "indexSmallProjectTest"}]}},
 			  { name: "indexMediumTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "indexMediumTest"}]}},
 			  { name: "Unknown1", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "IndexLargeProjectTest"}]}},
 			  { name: "Unknown2", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "IndexLargeProjectTest"}]}},
 			  { name: "Unknown3", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "IndexLargeProjectTest"}]}},
 			  { name: "Unknown4", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "IndexLargeProjectTest"}]}},
 			  { name: "scrollLargeFileTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "scrollLargeFileTest"}]}},
 			  { name: "StartUpPackagesInstalled", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "StartUpPackagesInstalled"}]}},
 			  { name: "StartUpFromScratch", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "StartUpFromScratch"}]}}
			 ],
		filter: {
		    logic: "AND",
		    filters: []
  		}
            }
        },
        {
            id: "2",
            type: "PieChartWidget",
            settings: {
                dataStore: "jenkins-emca-ide-kpi-test",
                groupBy: [{ field: "server" }],
                queries: [{ name: "Servers", aggregation: "UNIQUE", field: "server" }]
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
