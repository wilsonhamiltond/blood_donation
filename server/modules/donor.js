"use strict";
var mongoose = require('mongoose');
var express_1 = require('express');
var assert_1 = require('assert');
var q_1 = require('q');
var Schema = mongoose.Schema;
var Donor = (function () {
    function Donor(pool) {
        this.donorSchema = new Schema({
            firstName: String,
            lastName: String,
            contactNumber: String,
            emailAddress: String,
            bloodGroup: String,
            address: String,
            latitude: String,
            longitude: String,
            ipAddress: String,
            create_date: Date,
            update_date: Date
        });
        this.DonorModel = mongoose.model('donor', this.donorSchema);
    }
    Donor.prototype.save = function (donor) {
        var deff = q_1.defer();
        if (donor._id == '') {
            delete donor._id;
            donor.create_date = Date();
            donor.update_date = Date();
            var newDonor = new this.DonorModel(donor);
            newDonor.save(function (err, obj) {
                if (err) {
                    deff.reject(new Error(err));
                }
                else {
                    deff.resolve(obj);
                }
            });
        }
        else {
            donor.update_date = Date();
            this.DonorModel.update({ _id: donor._id }, {
                firstName: donor.firstName,
                lastName: donor.lastName,
                emailAddress: donor.emailAddress,
                contactNumber: donor.contactNumber,
                bloodGroup: donor.bloodGroup,
                update_date: Date()
            }, function (err, res) {
                if (err) {
                    deff.reject(new Error(err));
                }
                else {
                    deff.resolve(res);
                }
            });
        }
        return deff.promise;
    };
    Donor.prototype.get = function (params) {
        var deff = q_1.defer();
        this.DonorModel.find(params, function (err, donor) {
            if (err) {
                deff.reject(new Error(err));
            }
            else {
                deff.resolve(donor);
            }
        });
        return deff.promise;
    };
    Donor.prototype.donorDelete = function (params) {
        var deff = q_1.defer();
        this.get(params).then(function (donor) {
            donor[0].remove(function (err) {
                if (err) {
                    deff.reject(new Error(err));
                }
                else {
                    console.log('donor delete Success');
                    deff.resolve();
                }
            });
        }).catch(function (err) {
            deff.reject(new Error(err));
        });
        return deff.promise;
    };
    Donor.services = function (io) {
        var donor = new Donor();
        var router = express_1.Router();
        router.get('/donors', function (req, res) {
            donor.get({}).then(function (donors) {
                res.send(donors);
            }).catch(function (err) {
                res.send(err);
            });
        });
        router.get('/donor/:id', function (req, res) {
            donor.get({ _id: req.params.id }).then(function (donors) {
                res.send({ result: true,
                    donor: donors[0]
                });
            }).catch(function (err) {
                assert_1.equal(null, err);
                res.send({
                    result: false
                });
            });
        });
        router.post('/donor/delete', function (req, res) {
            var donorObject = req.body;
            donor.donorDelete({ _id: donorObject._id }).then(function () {
                io.emit('donor_delete', donorObject);
                res.send({
                    result: true
                });
            });
        });
        router.post('/donor', function (req, res) {
            var donorObject = req.body;
            donorObject.ipAddress = req.header('x-forwarded-for');
            donor.save(donorObject).then(function (obj) {
                var doc = obj._id ? obj._doc : donorObject;
                io.emit('donor_saved', doc);
                res.send({
                    result: true,
                    donor: doc
                });
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
    return Donor;
}());
exports.Donor = Donor;
//# sourceMappingURL=donor.js.map