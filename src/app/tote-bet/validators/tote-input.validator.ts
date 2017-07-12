import { ValidatorFn, AbstractControl } from '@angular/forms';
export function toteInputValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const inputValue = control.value;

        let errors = null;
        if (!inputValue) {
            errors = {
                required: true
            }
        } else {
            let reg = /(Bet:[W|P|E]:\d+(,\d+)?:\d+\s*)+(Result:\d+:\d+:\d+){1}/g;
            let isValid = reg.test(inputValue);
            if (!isValid) {
                errors = {
                    wrongFormat: true
                }
            }
        }

        return errors;
    };
}