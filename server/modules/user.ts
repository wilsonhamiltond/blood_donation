import * as mongoose from 'mongoose';
import { Router } from 'express';
import { defer } from 'q';
import { equal } from 'assert';

export class User{
    private userSchema: mongoose.Schema;
    private userModel:any;
    constructor(){
        this.userSchema = new mongoose.Schema({
            userName: String,
            name: String,
            create_date: Date
        });
        this.userModel = mongoose.model('user', this.userSchema);
    }
    
    getUser(userName: String){
        var deff = defer();
        this.userModel.find({userName: userName}, function(err, user){
            if( err ){
                deff.reject(new Error(err));
            }else{
                deff.resolve(user);
            }
        });
        
        return deff.promise;
    }
    
    saveUser(user){
        var deff = defer();
        user.create_date = Date();
        var newUser = new this.userModel(user);
        newUser.save(function(err, obj){
            if( err){
                deff.reject(new Error(err));
            }else{
                deff.resolve(obj);
            }
        });
        return deff.promise;
    }
    
    public static services(){
        var router = Router();
        var userModel = new User();
        router.post('/login', function(req, res){
            var userObject = req.body;
            userModel.getUser(userObject.userName).then(function(users){
               if( users.length == 0 ){
                   userModel.saveUser(userObject).then(function(ru){
                       res.send({
                           result: true,
                           user: ru._doc
                       });
                   }).catch(function(err){
                        equal(null, err);
                        res.send({
                            result: false,
                            message: err
                        });
                   })
               }else{
                   res.send({
                       result: true,
                       user: users[0]._doc
                   });
               }
            }).catch(function(err){
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