import { Injectable} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class DonorModel{
    constructor(fb: FormBuilder){
        return fb.group({
        '_id': '',
        'firstName' : [null , Validators.compose([Validators.required,  Validators.maxLength(20)])],
        'lastName': [ null, Validators.compose([Validators.required,Validators.maxLength(20)])],
        'contactNumber' : [ null, Validators.compose([Validators.required, Validators.maxLength(20)])],
        'emailAddress' : [ null, Validators.compose([Validators.required, Validators.maxLength(10)])],
        'bloodGroup' : [ null, Validators.compose([Validators.required])],
        });
    }
}