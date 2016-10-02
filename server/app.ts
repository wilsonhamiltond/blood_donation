import * as express from 'express';
import { json } from 'body-parser';
import { join } from 'path';
import * as mongoose from 'mongoose';
import { equal } from 'assert';

import { Donor } from './modules/donor';

/**
*   The server
*
*   @class Server
*/

class Server{
    public app: express.Application;
    
    public static bootstrap(): Server{
        return new Server();
    }
    
    constructor() {
        this.app = express();
        
        this.config();
        
        this.services();
        
        this.run();
    }
    
    config(){
        this.app.use(json())
        if (this.app.get("env") === "development") {
            this.app.use(express.static(join(__dirname, '../node_modules')));
            this.app.use(express.static(join(__dirname, '../tools')));
        }
        this.app.use('/', express.static(join(__dirname, '../')));
        this.app.use('/client', express.static(join(__dirname, '../client')));
        this.app.use( express.static( join( __dirname, '../public' ) ) );
        
        mongoose.connect('mongodb://localhost:27017/blood_donation');
    }
    
    services(){
        this.app.use(Donor.services());

        this.app.get('/', function(req, res){
           res.sendFile(__dirname + '../pulic/index.html'); 
        });
    }
    
    run(){
        this.app.listen( process.env.PORT || 8080, function(){
            console.log( 'Running in port: ' + (process.env.PORT || 8080));
        });
    }
}

Server.bootstrap();