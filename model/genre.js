import mongoose from 'mongoose';
import { genreSchema } from '../schema/genre.js';


const Model = mongoose.model('Genres',genreSchema);


export default {
    Model
};