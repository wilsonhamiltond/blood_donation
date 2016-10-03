"use strict";
var express = require('express');
var body_parser_1 = require('body-parser');
var path_1 = require('path');
var mongoose = require('mongoose');
var http = require('http');
var socket = require('socket.io');
var donor_1 = require('./modules/donor');
/**
*   The server
*
*   @class Server
*/
var Server = (function () {
    function Server() {
        this.app = express();
        this.http = http.Server(this.app);
        this.io = socket(this.http);
        this.config();
        this.services();
        this.run();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        var db = '';
        this.app.use(body_parser_1.json());
        if (this.app.get("env") === "development") {
            this.app.use(express.static(path_1.join(__dirname, '../node_modules')));
            this.app.use(express.static(path_1.join(__dirname, '../tools')));
            db = 'mongodb://localhost:27017/blood_donation';
        }
        if( db == ''){
            db = 'mongodb://heroku_8w7ntdjl:6n8gttupcjbd1i53un72khjpfp@ds049496.mlab.com:49496/heroku_8w7ntdjl';
        }
        this.app.use('/', express.static(path_1.join(__dirname, '../')));
        this.app.use('/client', express.static(path_1.join(__dirname, '../client')));
        this.app.use(express.static(path_1.join(__dirname, '../public')));
        //
        mongoose.connect(db);
    };
    Server.prototype.services = function () {
        this.app.use(donor_1.Donor.services(this.io));
        this.app.get('/', function (req, res) {
            res.sendFile(__dirname + '../pulic/index.html');
        });
    };
    Server.prototype.run = function () {
        this.io.on('connection', function (socket) {
            console.log('a user connected');
            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });
        this.http.listen(process.env.PORT || 8080, function () {
            console.log('Running in port: ' + (process.env.PORT || 8080));
        });
    };
    return Server;
}());
Server.bootstrap();
//# sourceMappingURL=app.js.map