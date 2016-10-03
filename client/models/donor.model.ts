import { Injectable} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Control } from "@angular/common";

interface ValidationResult {
    [key: string]: boolean;
}

@Injectable()
export class DonorModel{
    constructor(fb: FormBuilder){
        return fb.group({
        '_id': '',
        'firstName' : [null , Validators.compose([Validators.required,  Validators.maxLength(20)])],
        'lastName': [ null, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'contactNumber' : [ null, DonorModel.phone ],
        'emailAddress' : [ null, DonorModel.email ],
        'bloodGroup' : [ null, Validators.compose([Validators.required])],
        });
    }
    
    public static phone(control: Control): ValidationResult {
        //Skip validation if empty, to handle optional fields
        const phoneNumber = /(\+|[0]{2})[\d]{2} [\d]{3} [\d]{4} [\d]{3}$/g;
        if (!control.value) {
            return { "phone": true };
        }

        var valid = phoneNumber.test(control.value);
        if (valid) {
            return null;
        }
        return { "phone": true };
    }
    
    public static email(control: Control): ValidationResult {
        //Skip validation if empty, to handle optional fields
        const emailAddress = /\w+@+[a-zA-z]+?\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2}$)?/g;
        if (!control.value) {
            return { "email": true };
        }

        var valid = emailAddress.test(control.value);
        if (valid) {
            return null;
        }
        return { "email": true };
    }

}