import validator from 'validator';

class FormValidator {

    constructor(validations) {
        this.validations = validations;
    }

    validateState(state) {

        let validation = this.isValid();

        this.validations.forEach(rule => {
            const value = state[rule.value.toString()];
            const args = rule.args || [];
            const validationMethod = typeof rule.method === 'string' ? validator[rule.method] : rule.method;

            if (validationMethod(value, ...args, state) !== rule.isValidWhen) {
                validation[rule.value] = {
                    isInvalid: true,
                    message: rule.message
                }

                validation.isValid = false;
            }
        });

        return validation;
    }

    isValid() {
        const validation = {};

        this.validations.map(rule => (
            validation[rule.value] = { isInvalid: false, message: '' }
        ));

        return { isValid: true, ...validation };
    }
}

export default FormValidator;