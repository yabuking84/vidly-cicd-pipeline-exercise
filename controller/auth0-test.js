import express from "express";
const router = express.Router();
import err from '../modules/error.js';
import debug from "../modules/debug.js";
import auth0 from '../authentication/auth0.js';


router.get('/',async(request,response)=>{
    try {
        response.send('auth0');
    } catch (error) {
        err.catchResponse(error,response);
    }
});

router.post('/callback',async(request,response)=>{
    try {
        response.send('callback');
    } catch (error) {
        err.catchResponse(error,response);
    }
});

router.get('/secure1',auth0.middleware(),async(request,response)=>{
    try {
        debug.def('/secure1 request.oidc',request.oidc.user);
        response.send('secure1');
    } catch (error) {
        err.catchResponse(error,response);
    }
});

router.get('/yoyo',async(request,response)=>{
    try {
        debug.def('/yoyo request.oidc',request.oidc.user);
        if(typeof request.oidc !== 'undefined' && request.oidc.isAuthenticated())
        response.send('yoyo Logged in!');
        else 
        response.send('yoyo Not logged in!');
    } catch (error) {
        err.catchResponse(error,response);
    }
});

export default router;