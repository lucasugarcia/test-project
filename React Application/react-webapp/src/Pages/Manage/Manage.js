import React, { Component, Fragment } from 'react';
import './Manage.css';
import ApiService from '../../Utils/ApiService';
import PopUp from '../../Utils/PopUp';
import Header from '../../Components/Header/Header';
import Table from '../../Components/Table/Table';
import 'materialize-css/dist/css/materialize.min.css';
import Form from '../../Components/Form/Form';

class Manage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employees: []
		};
	}

	deleteEmployee = id => {

		const { employees } = this.state;

		const updatedEmployees = employees.filter(employee => {
			return employee.id !== id;
		});

		ApiService.DeleteEmployee(id)
			.then(response => {
				if (response.message === 'deleted') {
					this.setState({ employees: [...updatedEmployees] });

					PopUp.exibeMensagem('success', 'Employee removed!');
				}
			})
			.catch(erro => PopUp.exibeMensagem('error', 'Error to remove employee!'));
	}

	submitListener = employee => {

		employee.date = formatDate(new Date())

		ApiService.AddEmployee(JSON.stringify(employee))
			.then(response => {
				this.setState({ employees: [...this.state.employees, response] });
				PopUp.showMessage('success', 'Success!');
			})
			.catch(erro => PopUp.showMessage('error', 'Error to add a new employee!'));
	}

	componentDidMount() {
		ApiService.ListEmployees()
			.then(response => {
				this.setState({ employees: [...this.state.employees, ...response] });
			})
			.catch(erro => PopUp.showMessage('error', 'Error to list the employees!'));
	}

	render() {
		return (
			<Fragment>
				<Header />
				<div className="container mb-10">
					<Form submitListener={this.submitListener} />
					<Table employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
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

export default Manage;