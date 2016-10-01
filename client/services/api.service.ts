import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });

@Injectable()
export class ApiService{
    constructor( private authHttp: AuthHttp){}
    
    get(url){
        return this
            .authHttp
            .get(url)
            .map( (res: Response) => res.json());
    }
    
    post(url, object){
        return thsi
            .authHttp
            .post(url, object, options)
            .map( (res: RequestOptions) => res.json());
    }
}