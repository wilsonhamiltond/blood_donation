import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { DonorModel } from '../models/donor.model';

let options = new ResponseOptions({ headers: new Headers({ 'Content-Type': 'application/json'})});
@Injectable()
export class DonorService{
    constructor(private http: Http){

    }

    save( donor ){
        return this.http.post('/donor', donor, options)
            .map( (res) => res.json());
    }
}