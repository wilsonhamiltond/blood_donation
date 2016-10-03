import * as mongoose from 'mongoose';
import { Router } from 'express';
import { equal } from 'assert';
import { defer } from 'q';

const Schema = mongoose.Schema;

export class Donor{
    private donorSchema: Schema;
    private DonorModel: any;
    constructor(pool){
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
    
    save(donor){
        var deff = defer();
        if( donor._id == ''){
            delete donor._id;
            donor.create_date = Date();
            donor.update_date = Date();
            
            var newDonor = new this.DonorModel(donor);
            newDonor.save(function(err, obj){
                if(err){
                    deff.reject(new Error(err));
                }else{
                    deff.resolve(obj);
                }
            });
        }else{
            
        }
        return deff.promise;
    }
    
    get(params){
        var deff = defer();
        this.DonorModel.find(params, function(err, donor){
            if( err){
                deff.reject(new Error(err));
            }else{
                deff.resolve(donor);
            }
        });
        return deff.promise;
    }
    
    donorDelete(params){
        var deff = defer();
        this.get(params).then(function(donor){
            donor[0].remove(function(err){
                if(err){
                    deff.reject(new Error(err));
                }else{
                    console.log( 'donor delete Success');
                    deff.resolve();
                }
            });
        }).catch(function(err){
            deff.reject(new Error(err));
        })
        return deff.promise;
    }
    
    public static services(io){
        var donor = new Donor();
        var router: Router = Router();
        router.get('/donors', function(req, res){
            donor.get({}).then(function(donors){
                res.send(donors);
            }).catch(function(err){
                res.send(err);
            });
        });
        
        router.get('/donor/:id', function(req, res){
            donor.get({ _id: req.params.id }).then(function (donors) {
                res.send(
                    {result: true,
                     donor: donors[0]
                     });
            }).catch(function (err) {
                equal(null, err);
                res.send({
                    result: false
                });
            });
        });
        
        router.post('/donor/delete', function(req, res){
            var donorObject = req.body;
            donor.donorDelete({ _id: donorObject._id }).then(() => {
                io.emit('donor_delete', donorObject);
                res.send({
                    result: true
                });
            });
        });
        
        router.post('/donor', function(req, res){
            var donorObject = req.body;
            donorObject.ipAddress = req.header('x-forwarded-for');
            donor.save(donorObject).then(function (obj) {
                console.log(obj);
                io.emit('donor_saved', obj._doc);
                res.send({
                    result: true,
                    donor: obj._doc
                });
            }).catch(function (err) {
                equal(null, err);
                res.send({
                    result: false,
                    message: err
                });
            });
        });
        
        return router;
    }
}