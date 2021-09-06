import mongoose from 'mongoose';
import validator from '../modules/validator.js';
import debug from '../modules/debug.js';
import err from '../modules/error.js';

import { customerSchema } from '../schema/customer.js';


const Customer = mongoose.model('Customers',customerSchema);


function getModel(){
    return Customer;    
}

function getAllCustomers(page=0){ return new Promise( async (resolve,reject)=>{
    try {
        
        const pageNum = (page>0)?page:1;
        const pageSize = (page>0)?3:0;

        const customers = await Customer
        .find()
        .select('-__v')
        .skip((pageNum-1)*pageSize)
        .limit(pageSize);

        if(customers.length)
        return resolve(customers);
        else 
        err.throwError('Empty','Customers empty!');
    } catch (error) {
        err.catchReject(error ,reject);
    }       
});}

function getCustomerByName(name) { return new Promise(async(resolve,reject)=>{
    try {
        // validate input
        validator.customer({
            name
        });
        
        const customerFound = await Customer
        .findOne({
            name
        })
        .select({
            name: 1,
            rank: 1,
            __v: 0
        });

        if(customerFound)
        return resolve(customerFound);
        else 
        err.throwError('NotFound','Customer not found!');


    } catch (error) {
        err.catchReject(error ,reject);
    }   

});}



function findCustomerById(customerId) { return new Promise(async (resolve,reject)=>{
    try {
        validator.objectId({id:customerId});
        const customer = await Customer.findById(customerId);
        if(customer)
        return resolve(customer);
        else 
        err.throwError('NotFound','Customer not found!');        
    } catch (error) {
        err.catchReject(error ,reject);
    }
});}


function sendCustomerEmail(customer) { return new Promise(async (resolve,reject)=>{
    try {
        const emailSent = await simulateEmail(customer.name);
        resolve(emailSent);
    } catch (error) {
        err.catchReject(error ,reject);
    }        
});}



function addCustomer(name,age,rank) { return new Promise(async(resolve,reject)=>{
    try {
        validator.customer({name});

        // Add customer here to db
        const customerNew = new Customer({
            name: name,
            age: age,
            rank: rank
        });
        const retVal =  await customerNew.save();
        resolve(retVal);

    } catch (error) {
        err.catchReject(error ,reject);
    }    
});}




function updateCustomer(id,name,rank) {return new Promise(async(resolve,reject)=>{
    try {
        validator.customerUpdate({
            id,
            name,
            rank
        });

        const set = (rank)? {
            name, rank 
        } : {
            name
        };

        const customerUpdate = await Customer.findOneAndUpdate({
            _id: id
        },{
            $set: set
        }, {
            new: true
        });
        if(customerUpdate) {
            resolve(customerUpdate);
        } else {
            err.throwError('NotFound','Update failed! Customer not found!');
        }

    } catch (error) {
        err.catchReject(error ,reject);
    }
});}






function deleteCustomer(id){return new Promise(async(resolve,reject)=>{
    try {
        validator.customerDelete({id});

        const customerDeleted = await Customer.findOneAndDelete({_id:id});
        if(customerDeleted)
        resolve(customerDeleted);
        else
        err.throwError('NotFound','Delete failed! Customer not found!');

    } catch (error) {
        err.catchReject(error,reject);
    }
});}






















function simulateEmail(name){return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        try {
            resolve(true);
    
            // throw error if needed when error is not sent
            // err.throwError('EmailFailed',`Customer: ${name}'s email not sent!`);
        } catch (error) {
            err.catchReject(error ,reject);
        }
    },2000);        
});}













async function testing(name,rank) {
    const asd = new TestAsync();
    const retVal =  await asd.savePromise();
    debug.def('retVal',retVal);
    return retVal;
}


class TestAsync {
    savePromise(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve('savePromise().....');
            },3000);    
        });
    }

    save(){
        setTimeout(()=>{
            debug.def('save() log');
            return 'save()';
        },3000);
        debug.def('mmmmmmmmmm');
    }

}


export {findCustomerById};

export default {
    getModel,
    getAllCustomers,
    getCustomerByName,
    findCustomerById,
    sendCustomerEmail,
    addCustomer,
    updateCustomer,
    deleteCustomer
};
