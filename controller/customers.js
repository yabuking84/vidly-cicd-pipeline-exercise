import express from "express";
const router = express.Router();

import debug from '../modules/debug.js';

import  err from '../modules/error.js';
import em from '../middleware/error.js';

import customer from "../repository/customer.js";

import authentication from '../middleware/auth.js';

router.get('/', async(request,response)=>{
    try {
        const customers = await customer.getAllCustomers();
        response.send(customers);
    } catch (error) {
        err.catchResponse(error,response);
    }
});

router.get('/page/:pageNum', async(request,response)=>{
    try {
        const customers = await customer.getAllCustomers(request.params.pageNum);
        response.send(customers);
    } catch (error) {
        err.catchResponse(error,response);
    }
});

router.post('/find',async(request,response)=>{
    try {
        const customerFound = await customer.getCustomerByName(request.body.name);
        // if rank is gold
        if(customerFound.rank == 'gold') {
            const emailSent = await customer.sendCustomerEmail(customerFound);
            response.send({
                ...customerFound.toObject(),
                emailSent: (emailSent)?true:false
            });
        } else {
            response.send(customerFound);            
        }
        
    } catch (error) {
        err.catchResponse(error,response);
    }
});


router.post('/',authentication.loggedIn,async(request,response)=>{
    try {
        const customerAdded = await customer.addCustomer(request.body.name,request.body.age,request.body.rank);
        response.send(customerAdded);  
    } catch(error) {
        err.catchResponse(error,response);
    }
});

router.put('/',async(request,response)=>{
    try {
        const customerUpdated = await customer.updateCustomer(request.body.id,request.body.name,request.body.rank);
        response.send(customerUpdated);  
    } catch (error) {
        err.catchResponse(error,response);
    }
});

// for routes that needs to be logged in and has an admin role
router.delete('/delete',[authentication.loggedIn,authentication.admin],async(request,response)=>{
    try {
        const customerDeleted = await customer.deleteCustomer(request.body.id);
        response.send(customerDeleted);
    } catch (error) {
        err.catchResponse(error,response);
    }
});


export default router;