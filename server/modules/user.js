"use strict";
var mongoose = require('mongoose');
var express_1 = require('express');
var q_1 = require('q');
var assert_1 = require('assert');
var User = (function () {
    function User() {
        this.userSchema = new mongoose.Schema({
            userName: String,
            name: String,
            create_date: Date
        });
        this.userModel = mongoose.model('user', this.userSchema);
    }
    User.prototype.getUser = function (userName) {
        var deff = q_1.defer();
        this.userModel.find({ userName: userName }, function (err, user) {
            if (err) {
                deff.reject(new Error(err));
            }
            else {
                deff.resolve(user);
            }
        });
        return deff.promise;
    };
    User.prototype.saveUser = function (user) {
        var deff = q_1.defer();
        user.create_date = Date();
        var newUser = new this.userModel(user);
        newUser.save(function (err, obj) {
            if (err) {
                deff.reject(new Error(err));
            }
            else {
                deff.resolve(obj);
            }
        });
        return deff.promise;
    };
    User.services = function () {
        var router = express_1.Router();
        var userModel = new User();
        router.post('/login', function (req, res) {
            var userObject = req.body;
            userModel.getUser(userObject.userName).then(function (users) {
                if (users.length == 0) {
                    userModel.saveUser(userObject).then(function (ru) {
                        res.send({
                            result: true,
                            user: ru._doc
                        });
                    }).catch(function (err) {
                        assert_1.equal(null, err);
                        res.send({
                            result: false,
                            message: err
                        });
                    });
                }
                else {
                    res.send({
                        result: true,
                        user: users[0]._doc
                    });
                }
            }).catch(function (err) {
                assert_1.equal(null, err);
                res.send({
                    result: false,
                    message: err
                });
            });
        });
        return router;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map