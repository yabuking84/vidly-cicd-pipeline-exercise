import mongoose from 'mongoose';
import validator from '../modules/validator.js';
import debug from '../modules/debug.js';
import err from '../modules/error.js';

import _ from "lodash";

import hash from '../modules/hash.js';


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
    addUser,
    emailExist,
    getUser,
    getAllUsers
};