import React, { Component, Fragment } from 'react';
import './Home.css';
import ApiService from '../../Utils/ApiService';
import PopUp from '../../Utils/PopUp';
import Header from '../../Components/Header/Header';
import Table from '../../Components/Table/Table';
import 'materialize-css/dist/css/materialize.min.css';

class Home extends Component {
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
					<Table employees={this.state.employees} deleteEmployee={this.deleteEmployee} />
				</div>
			</Fragment>
		);
	}
}

export default Home;