import mongoose from 'mongoose';
import helper from '../modules/helper.js';

import { customerMiniSchema } from './customer.js';
import { movieMiniSchema } from './movie.js';


export const rentalSchema = new mongoose.Schema({
    customer: customerMiniSchema,
    movie: movieMiniSchema,
    dateRented: {
        type: Date,
        required: true,
        default: Date.now()
    },
    dateReturned: {
        type: Date
    },
    dailyRentalFee: {
        type: Number,
        min: 0,
        get: val => helper.currency(val),
        set: val => helper.currency(val)
    }
});

