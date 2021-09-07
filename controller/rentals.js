import express from 'express';
const router = express.Router();

import debug from '../modules/debug.js';
import  err from '../modules/error.js';

import rental from '../repository/rental.js';

router.get('/',async(request,response)=>{
    try {
        const rentalsFound = await  rental.getAllRentals();
        response.send(rentalsFound);
    } catch (error) {
        err.catchResponse(error,response);
    }
});

router.get('/page/:page', async (request,response)=>{
    try {
        const data = await rental.getAllRentals(request.params.page);
        response.send(data);
    } catch (error) {
        err.catchResponse(error,response);
    }
});

router.post('/', async(request,response)=>{
    try {
        const data = await rental.addRental(request.body.customerId,request.body.movieId);
        response.send(data);
    } catch (error) {
        err.catchResponse(error,response);
    }
});


export default router;