import mongoose from 'mongoose';
import {userSchema} from '../schema/user.js';

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

const Model = mongoose.model('Users',userSchema);



export default {
    Model
};