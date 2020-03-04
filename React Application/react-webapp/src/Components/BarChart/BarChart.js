import React, { Component } from 'react';
import Chart from 'react-google-charts';

class BarChart extends Component {
    render() {
        let data = [['Date', 'Amount'], ...this.props.data.map(d => [d.date, d.amount])]

        return (
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                data={data}
                loader={<div>Loading Chart</div>}
                options={{
                    title: "Employees Amount x Date",
                    hAxis: {
                        minValue: 0,
                    },
                }}

                legendToggle
            />
        )
    }
}

export default BarChart;