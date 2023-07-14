import { AbstractControl, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static ConfirmPassword<T>(match: (value: string) => boolean): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            let value = control.value;
            if (match(value)) {
                return null;
            }
            else {
                return { 'notSame': true }
            }
        }
    };

    static SelectFromList<T>(exists: (value: any) => boolean): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            let value = control.value;

            if (exists(value)) {
                return null;
            }
            else if (value == null || value == '') {
                return null;
            }
            else {
                return { 'validSelection': true }
            }
        }
    };
}
