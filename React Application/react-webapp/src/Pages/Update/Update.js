import React, { Component, Fragment } from 'react';
import ApiService from '../../Utils/ApiService';
import PopUp from '../../Utils/PopUp';
import Header from '../../Components/Header/Header';
import FormUpdate from '../../Components/FormUpdate/FormUpdate';

class Update extends Component {

    submitListener = employee => {

        employee.date = formatDate(new Date())

		ApiService.UpdateEmployee(JSON.stringify(employee))
			.then(response => {
                PopUp.showMessage('success', 'Success!');
                
                window.location.href='/manage';
			})
			.catch(erro => PopUp.showMessage('error', 'Error to update the employee!'));
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="container mb-10">
                    <FormUpdate submitListener={this.submitListener} employee={this.props.history.location.state} />
                </div>
            </Fragment>
        );
    }
}

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	return [year, month, day].join('-');
}

export default Update;