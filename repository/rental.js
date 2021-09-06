import validator from '../modules/validator.js';
import  err from '../modules/error.js';
import helper from '../modules/helper.js';




import _ from "lodash";

import mongoose from 'mongoose';
const conn = mongoose.connection;

import { rentalSchema } from '../schema/rental.js';
import { findCustomerById } from './customer.js';
import { findMovieById } from './movie.js';

const Rental = mongoose.model('Rentals',rentalSchema);


function getModel(){
    return Rental;    
}

function getAllRentals(page=0){return new Promise(async(resolve,reject)=>{
    try {
        const pageNum = (page>0)?page:1;    
        const pageSize = (page>0)?3:0;

        const rentalsFound = await Rental
        .find()
        .select('-__v')
        .skip((pageNum-1)*pageSize)
        .populate('customer.details','-__v')
        .populate('movie.details','-__v')
        // .populate('movie')
        .limit(pageSize);

        if(rentalsFound.length)
        resolve(rentalsFound);
        else
        err.throwError('Empty','Rentals empty!');        
    } catch (error) {
        err.catchReject(error, reject);
    }
});}


function addRental(customerId,movieId){return new Promise(async(resolve,reject)=>{

    // transaction start
    const session = await conn.startSession();     
    session.startTransaction();

    try {
        validator.rental({
            customerId,
            movieId
        });

        const customer = await findCustomerById(customerId);
        const movie = await findMovieById(movieId);

        if(!movie.dailyRentalRate || !_.isNumber(movie.dailyRentalRate))
        err.throwError('InvalidInput','Movie Daily Rental Fee is invalid!');

        const rentalAdded = await new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                details: customer._id,
            },
            movie: {
                _id: movie._id,
                name: movie.name,
                details: movie._id
            },
            dailyRentalFee: movie.dailyRentalRate
        }).save({session});

        movie.inStock--;
        await movie.save({session});

        // transaction commit
        await session.commitTransaction();

        resolve(rentalAdded);

    } catch (error) {
        // transaction rollback
        await session.abortTransaction();
        err.catchReject(error,reject);
    }


    // transaction end
    session.endSession();

});}




export default {
    getModel,
    getAllRentals,
    addRental    
};