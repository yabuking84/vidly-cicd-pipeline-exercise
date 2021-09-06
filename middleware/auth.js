// Debugger
import debug from '../modules/debug.js';

import err from '../modules/error.js';

import config from 'config';

import jwt from 'jsonwebtoken';

function loggedIn(request,response,next){
    try {
        const token = request.header('authorization').split("Bearer ")[1];

        // Using JWT
        if(!token) 
        err.throwError('InvalidToken','Access Denied Invalid Token!'); 

        const decoded = jwt.verify(token,config.get('jwt_key'));
        request.user = decoded;

        next();
            
    } catch (error) {
        next(error);
    }
}


function admin(request,response,next){
    try {

        // check if admin
        if(request.user.role!=='admin') 
        err.throwError('InvalidRole','Role invalid!');

        next();
            
    } catch (error) {
        next(error);
    }
}



export default {
    loggedIn,
    admin
};