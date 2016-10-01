"use strict";
var express = require('express');
var body_parser_1 = require('body-parser');
var path_1 = require('path');
var mongoose = require('mongoose');
var poll_1 = require('./modules/poll');
var user_1 = require('./modules/user');
/**
*   The server
*
*   @class Server
*/
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.services();
        this.run();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        this.app.use(body_parser_1.json());
        if (this.app.get("env") === "development") {
            this.app.use(express.static(path_1.join(__dirname, '../node_modules')));
            this.app.use(express.static(path_1.join(__dirname, '../tools')));
        }
        this.app.use('/client', express.static(path_1.join(__dirname, '../client')));
        this.app.use(express.static(path_1.join(__dirname, '../public')));
        mongoose.connect('mongodb://localhost:27017/voting');
    };
    Server.prototype.services = function () {
        this.app.use(poll_1.Poll.services());
        this.app.use(user_1.User.services());
        this.app.get('/', function (req, res) {
            res.sendFile(__dirname + '../public/index.html');
        });
    };
    Server.prototype.run = function () {
        this.app.listen(process.env.PORT || 8080, function () {
            console.log('Running in port: ' + (process.env.PORT || 8080));
        });
    };
    return Server;
}());
Server.bootstrap();
//# sourceMappingURL=app.js.map