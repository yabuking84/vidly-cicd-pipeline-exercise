import mongoose from 'mongoose';
import validator from '../modules/validator.js';
import debug from '../modules/debug.js';
import err from '../modules/error.js';

import {userSchema} from '../schema/user.js';
import _ from "lodash";

import hash from '../modules/hash.js';

import jwt from 'jsonwebtoken';
import config from 'config';

// Add a method to the User Model
userSchema.methods.generateAuthToken = function(){
    // 60 * 30 means expire in 3 min, if "120d" means 120 days, if "120" means 120 milliseconds
    return jwt.sign(
        {
            _id:this._id,
            role:this.role
        }, 
        config.get('jwt_key'), 
        {expiresIn:60*360}
    );
};

const User = mongoose.model('Users',userSchema);


function getModel(){
    return User;    
}

function getUser(id){return new Promise(async(resolve,reject)=>{
    try {
        const user = User.findById(id).select('-password -_id -__v');
        resolve(user);
    } catch (error) {
        err.catchReject(error,reject);
    }
});}

function getAllUsers(){return new Promise(async(resolve,reject)=>{
    try {
        const users = User.find().select('-password -_id -__v');
        resolve(users);
    } catch (error) {
        err.catchReject(error,reject);
    }
});}

function addUser(name,email,password,password_confirm){return new Promise(async(resolve,reject)=>{
    try {
        validator.user({
            name,email,password,password_confirm
        });

        const hashedPassword = await hash.run(password);

        const userNew = await new User({
            name,
            email,
            password:hashedPassword
        }).save();

        resolve(_.pick(userNew,['_id','name','email']));

    } catch (error) {
        err.catchReject(error,reject);
    }
});}

function emailExist(email){return new Promise(async(resolve,reject)=>{
    try {
        const user = await User.findOne({'email':email});
        if(user)
        resolve(true);
        else 
        resolve(false);
    } catch (error) {
        err.catchReject(error,reject);
    }
});}

export default {
    getModel,
    addUser,
    emailExist,
    getUser,
    getAllUsers
};