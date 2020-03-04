import React, { Component } from 'react';
import FormValidator from '../../Utils/FormValidator';
import PopUp from '../../Utils/PopUp';

class Form extends Component {

    constructor(props) {
        super(props);

        this.validator = new FormValidator(
            [
                {
                    value: 'name',
                    method: 'isEmpty',
                    isValidWhen: false,
                    message: 'Please, insert employee\'s name!'
                },
                {
                    value: 'address',
                    method: 'isEmpty',
                    isValidWhen: false,
                    message: 'Please, insert address!'
                },
                {
                    value: 'phone_number',
                    method: 'isEmpty',
                    isValidWhen: false,
                    message: 'Please, insert the phone number!'
                },
                {
                    value: 'status',
                    method: 'isEmpty',
                    isValidWhen: false,
                    message: 'Please, insert the status!'
                }
            ]
        );

        this.initialState = {
            name: '',
            address: '',
            phone_number: '',
            status: '',
            validation: this.validator.isValid()
        }

        this.state = this.initialState;
    }

    inputListener = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    submitForm = () => {
        const validation = this.validator.validateState(this.state);

        if (validation.isValid) {
            this.props.submitListener(this.state);
            this.setState(this.initialState)
        } else {
            const { name, address, phone_number, status } = validation;
            const fields = [name, address, phone_number, status];

            const invalidFields = fields.filter(element => {
                return element.isInvalid;
            });

            invalidFields.forEach(field => {
                PopUp.showMessage('error', field.message);
            });
        }
    }

    onInput = () => {
        let fileInput = document.querySelector('input[type="file"]');
        let file = fileInput.files[0];
        let reader = new FileReader();
        
        const importFun = this.props.importFunction;

        reader.onload = () => {
            let result = String(reader.result)
            
            let employees = [];
            
            employees = result.split('\n');
            
            for (var i = 1; i < employees.length; i++) {
                if (employees[i].type !== 'string') {
                    
                    const employee = employees[i];
                    
                    let attribs = [];
                    
                    attribs = employee.split(',');

                    const name = attribs[0].replace('"', '').replace('\r', '').replace('\n', '');
                    const address = attribs[1].replace('"', '').replace('\r', '').replace('\n', '');
                    const phone_number = attribs[2].replace('"', '').replace('\r', '').replace('\n', '');
                    const date = attribs[3].replace('"', '').replace('\r', '').replace('\n', '');
                    const status = attribs[4].replace('"', '').replace('\r', '  ').replace('\n', '');

                    const newEmployee = {
                        name: name.replace('"', '').trim(),
                        address: address.replace('"', '').replace('\r', '').replace('\n', '').trim(),
                        phone_number: phone_number.replace('"', '').replace('\r', '').replace('\n', '').trim(),
                        date: date.replace('"', '').replace('\r', '').replace('\n', '').trim(),
                        status: status.replace('"', '').replace('\r', '').replace('\n', '').trim()
                    };

                    importFun(newEmployee);
                }
            }
        }

        reader.readAsText(file);
    }

    render() {

        const { name, address, phone_number, status } = this.state;

        return (
            <form>
                <div className="row">
                    <div className="input-field col s3">
                        <input placeholder="Name" className="validate" id="name" type="text" name="name" value={name} onChange={this.inputListener} />
                    </div>
                    <div className="input-field col s3">
                        <input placeholder="Address" className="validate" id="address" type="text" name="address" value={address} onChange={this.inputListener} />
                    </div>
                    <div className="input-field col s3">
                        <input placeholder="Phone Number" className="validate" id="phone_number" type="text" name="phone_number" value={phone_number} onChange={this.inputListener} />
                    </div>
                    <div className="input-field col s3">
                        <input placeholder="Status (True or False)" className="validate" id="status" type="text" name="status" value={status} onChange={this.inputListener} />
                    </div>
                </div>

                <button className="waves-effect waves-light indigo lighten-2 btn" type="button" onClick={this.submitForm}>Add</button>
                <br />
                or import a csv file with the employees clicking here:
                <div align="center">
                    <input type="file" onInput={this.onInput}></input>
                </div>
            </form >
        );
    }
}

export default Form;