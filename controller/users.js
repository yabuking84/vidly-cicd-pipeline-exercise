import express from "express";
const router = express.Router();

// import debug from '../modules/debug.js';
import err from '../modules/error.js';
import user from '../repository/user.js';

import authorization from '../middleware/auth.js';

// get user
router.get('/details',authorization.loggedIn,async(request,response)=>{
    try {
        const userFound = await user.getUser(request.user._id);
        response.send(userFound);
    } catch (error) {
        err.catchResponse(error,response);
    }
});


// add user
router.post('/add',authorization.loggedIn,async(request,response)=>{
    try {
        const userAdded = await user.addUser(
            request.body.name,
            request.body.email,
            request.body.password,
            request.body.password_confirm
        );
        response.send(userAdded);
    } catch (error) {
        err.catchResponse(error,response);
    }
});


// get all user
router.get('/all',[authorization.loggedIn,authorization.admin],async(request,response)=>{
    try {
        const users = await user.getAllUsers();
        response.send(users);
    } catch (error) {
        err.catchResponse(error,response);
    }
});





// comment this. this is to test if thenables work on mongoose models
// import mongoose from 'mongoose';
// import {userSchema} from '../schema/user.js';
// const User = mongoose.model('Users',userSchema);
// router.get('/test',(request,response)=>{
//     try {
//         User.find().then((val)=>{
//             console.log('val',val);
//             response.send(val);
//         });
//     } catch (error) {
//         err.catchResponse(error,response);
//     }
// });





export default router;