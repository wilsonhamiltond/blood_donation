import { Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Component({
    selector: 'v-home',
    templateUrl: 'client/modules/home/home.component.html'
})

export class HomeComponent{
    public polls: [];
    
    constructor(private http: Http){
        this.getPoll();
    }
    
    getPoll(){
        var request = this.http.get("/polls")
        .map((res: Response) => res.json())
            .subscribe(
                (res: Response) => {
                    this.polls = res;
                },
                (error: Error) => { console.log(error); }
            );
    }
}