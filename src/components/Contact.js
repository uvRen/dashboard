import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class Contact extends Component {
    constructor() {
        super();
        this.state = {
            options: {
                title: 'Simon',
                hAxis: { title: 'Age', minValue: 0, maxValue: 15 },
                vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
                legend: 'none',
            },
            rows: [
                [8, 12],
                [4, 5.5],
                [11, 14],
                [4, 5],
                [3, 3.5],
                [6.5, 7],
            ],
            columns: [
                {
                    type: 'number',
                    label: 'Age',
                },
                {
                    type: 'number',
                    label: 'Weight',
                },
            ],
        };
    }
    render() {
        return (
            <Chart
                chartType="ScatterChart"
                rows={this.state.rows}
                columns={this.state.columns}
                options={this.state.options}
                graph_id="ScatterChart"
                width={'100%'}
                height={'400px'}
                legend_toggle
            />
        );
    }
}

export default (Contact);
