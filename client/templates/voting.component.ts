import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'voting-app',
    templateUrl: 'client/templates/html/voting.component.html'
})
export class VotingComponent{
    public logged = false;
    public loggedUser: {};
    
    constructor(private http: Http){
        var token = localStorage.getItem('id_token');
        if( token){
            var user = {};
            try{
                user = JSON.parse(token);
            }catch(e){}
            if( user.name){
                this.loggedUser = user;
                this.logged = true;
            }
        }
    }
    
    login(){
        var user = {
            userName: 'wilsonhamiltond',
            name: 'Wilson Hamilton',
        };
        this.http.post('/login', user, new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }))
        .map( (res: Response) => res.json() )
        .subscribe( (res: Response) => {
            if(!res.result) return;
            localStorage.setItem('id_token', JSON.stringify( res.user ));
            this.loggedUser = res.user;
            this.logged = true;
        },
        (error: Error) => {
            console.log(error);
        });
    }
    
    logout(){
        localStorage.removeItem('id_token');
        this.loggedUser = {};
        this.logged = false;
    }
};