import React, { Component } from 'react';
import FormValidator from '../../Utils/FormValidator';
import PopUp from '../../Utils/PopUp';

class FormUpdate extends Component {

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
            id: props.employee.id,
            name: props.employee.name,
            address: props.employee.address,
            phone_number: props.employee.phone_number,
            status: props.employee.status,
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
        
        console.log(this.state)
        
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

    render() {

        const { id, name, address, phone_number, status } = this.state;

        return (
            <form>
                <div className="row">
                    <input type="hidden" id="id" name="id" value={id} />
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

                <button className="waves-effect waves-light indigo lighten-2 btn" type="button" onClick={this.submitForm}>Update</button>
            </form>
        );
    }
}

export default FormUpdate;