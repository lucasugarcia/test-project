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
            </form>
        );
    }
}

export default Form;