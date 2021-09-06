import mongoose from 'mongoose';

import user from '../repository/user.js';

import err from '../modules/error.js';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },   
    contactNo: {
        type: String,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    role: {
        type: String,
        enum: ['user','employee','admin'],
        default: 'user'
    },    
    email: {
        type: String,
        required: true,
        validate: {
            validator: async (val)=>{
                try {
                    const emailExist = await user.emailExist(val);
                    if(emailExist)
                    return false;
                    else
                    return true;
                } catch (error) {
                    err.throwError('CheckEmailExist',error.message);
                }
            },
            message: 'User already exist!'
        },
        minlength: 3,
        maxlength: 255,
        unique: true,
        trim: true
    },
    password: {
        type: Sstring,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});


export {userSchema};