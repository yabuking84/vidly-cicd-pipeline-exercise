import mongoose from 'mongoose';
import helper from '../modules/helper.js';

export const movieSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genres',
        required: true
    },
    inStock: {
        type: Number,
        default: 0,
        min: 0,
        max: 999
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        get: val => helper.currency(val),
        set: val => helper.currency(val),        
        required: true
    }    
});

export const movieMiniSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies',
    }    
});