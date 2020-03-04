import React, { Component, Fragment } from 'react';
import Header from '../../Components/Header/Header';
import ApiService from '../../Utils/ApiService';
import PopUp from '../../Utils/PopUp';
import BarChart from '../../Components/BarChart/BarChart';

class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        ApiService.ChartData()
            .then(response => {
                this.setState({ data: [...this.state.data, ...response] });
            })
            .catch(erro => PopUp.showMessage('error', 'Error to get chart data!'));
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className='chart-container'>
                    <BarChart data={this.state.data} />
                </div>
            </Fragment>
        );
    }
}

export default Chart;