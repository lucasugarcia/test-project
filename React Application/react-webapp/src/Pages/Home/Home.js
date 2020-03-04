import React, { Component, Fragment } from 'react';
import './Home.css';
import ApiService from '../../Utils/ApiService';
import PopUp from '../../Utils/PopUp';
import Header from '../../Components/Header/Header';
import 'materialize-css/dist/css/materialize.min.css';
import MUIDataTable from "mui-datatables";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employees: []
		};
	}

	componentDidMount() {
		ApiService.ListEmployees()
			.then(response => {
				this.setState({ employees: [...this.state.employees, ...response] });
			})
			.catch(erro => PopUp.showMessage('error', 'Error to list the employees!'));
	}

	render() {
		const columns = ["name", "address", "phone_number", "date", "status"]
		
		const options = {
			filterType: "dropdown",
			responsive: "scroll",
			downloadOptions: {
				filterOptions: {
					useDisplayedRowsOnly: "true"
				}
			}
		};

		return (
			<Fragment>
				<Header />
				<div>
				<MUIDataTable
					title={"Employees"}
					data={this.state.employees}
					columns={columns}
					options={options}
				/>
				</div>
			</Fragment>
		);
	}
}

export default Home;