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
            }, {
		x: 8,
		y: 4,
		h: 4,
		w: 4,
		i: "3"
	    }, {
                x: 0,
                y: 4,
                h: 4,
                w: 8,
                i: "4"
  	    }, {
                x: 0,
                y: 8,
                h: 4,
                w: 8,
                i: "5"
  	    }, {
                x: 8,
                y: 8,
                h: 4,
                w: 4,
                i: "6"
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
            type: "LineChartWidgetLog",
            settings: {
                dataStore: "jenkins-emca-ide-kpi",
                groupBy: [{ field: "_time", interval: "1day" }],
                queries: [{ name: "importSmallProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importSmallProjectTest"}]}},
 			  { name: "importMediumProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importMediumProjectTest"}]}},
 			  { name: "importLargeProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importLargeProjectTest"}]}},
 			  { name: "indexSmallTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "indexSmallTest"}]}},
 			  { name: "indexMediumTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "indexMediumTest"}]}},
 			  { name: "indexLargeTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "indexLargeTest"}]}},
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
                dataStore: "jenkins-emca-ide-kpi",
                groupBy: [{ field: "groupId" }],
                queries: [{ name: "Categories", aggregation: "UNIQUE", field: "testName" }]
            }
        },
	{
            id: "3",
            type: "PieChartWidget",
            settings: {
             dataStore: "jenkins-emca-ide-kpi",
              groupBy: [{ field: "server" }],
               queries: [{ name: "Servers", aggregation: "UNIQUE", field: "server" }]
            }
        },
	{
            id: "4",
            type: "LineChartWidget",
            settings: {
                dataStore: "jenkins-emca-ide-kpi",
                groupBy: [{ field: "_time", interval: "1day" }],
                queries: [{ name: "importSmallProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importSmallProjectTest"}]}},
 			  { name: "importMediumProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importMediumProjectTest"}]}},
 			  { name: "importLargeProjectTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "importLargeProjectTest"}]}},
 			  { name: "indexSmallTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "indexSmallTest"}]}},
 			  { name: "indexMediumTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "indexMediumTest"}]}},
 			  { name: "indexLargeTest", aggregation: "AVG", field: "duration", filter: { logic: "AND", filters: [{field: "testName", operator: "EQ", value: "indexLargeTest"}]}},
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
            id: "5",
            type: "BarChartWidget",
            settings: {
                dataStore: "applications-eclipse-freeze",
                groupBy: [{field: "UserName"}],
		sortDescription: [{field: "FreezeLasted", sortOrder: "DESC"}],
                queries: [{ name: "freeze > 40s", aggregation: "CNT", field: "FreezeLasted", filter: { logic: "AND", filters: [{ field: "FreezeLasted", operator: "GT", value: 40000 }]}}],
		filter: {
		    logic: "AND",
		    filters: []
  		}
            }
        },
	{
            id: "6",
            type: "PieChartWidget",
            settings: {
             dataStore: "applications-eclipse-freeze",
              groupBy: [{ field: "HostName" }],
               queries: [{ name: "Freeze/Server", aggregation: "UNIQUE", field: "FreezeLasted", filter: { logic: "AND", filters: [{ field: "HostName", operator: "STARTSWITH", value: "esekilxv769"}]}}]
            }
        },
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
