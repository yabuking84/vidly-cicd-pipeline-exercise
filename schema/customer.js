import mongoose from 'mongoose';

export const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },    
    age: {
        type: Number,
        min: 18,
        max: 65,
        required: true
    },
    rank:  {
        type: String,
        default: 'bronze',
        lowercase: true,
        trim: true,
        enum: ['bronze','silver','gold']
    }
});


export const customerMiniSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        required: true
    }
});