import express from 'express';
const router = express.Router();

// import debug from '../modules/debug.js';
import err from '../modules/error.js';

import auth from '../model/auth.js';

import debug from '../modules/debug.js';

router.post('/login',async (request,response)=>{
    try {
        const token = await auth.loginUser(
            request.body.email,
            request.body.password
        );
        response.header('x-auth-token',token).send(true);
    } catch (error) {
        err.catchResponse(error,response);
    }
});


export default router;