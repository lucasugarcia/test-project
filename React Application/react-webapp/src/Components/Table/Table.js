import React, { Component } from 'react';
import LinkWrapper from '../../Utils/LinkWrapper';

const TableHead = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const lines = props.employees.map((line) => {
        return (
            <tr key={line.id}>
                <td>{line.name}</td>
                <td>{line.address}</td>
                <td>{line.phone_number}</td>
                <td>{line.date}</td>
                <td>{line.status}</td>
                <td>
                    <button type="submit" className="waves-effect waves-light indigo lighten-2 btn" onClick={() => {
                        props.deleteEmployee(line.id)
                    }}>
                        Remove
                    </button>
                </td>
                <td>
                    <LinkWrapper className="waves-effect waves-light indigo lighten-2 btn" 
                    to={{pathname: '/update', state: line}}>Edit</LinkWrapper>
                </td>
            </tr>
        );
    });

    return (
        <tbody>
            {lines}
        </tbody>
    );
}

class Tabela extends Component {
    render() {

        const { employees, deleteEmployee } = this.props;

        return (
            <table className="centered highlight">
                <TableHead />
                <TableBody employees={employees} deleteEmployee={deleteEmployee} />
            </table>
        );
    }
}

export default Tabela;