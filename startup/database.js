import mongoose from 'mongoose';
import debug from '../modules/debug.js';
import logger from '../modules/logger.js';

function init() {
    // must configure mongodb to enable replica set to make transactions work
    mongoose.connect('mongodb://mongodb/vidly',{
        'useNewUrlParser': true,
        'useFindAndModify': false,
        'useCreateIndex': true,
        'useUnifiedTopology': true
    })
    .then(()=>{
        debug.def('Connected to MongoDB..');
    })
    .catch((error)=>{
        debug.db('DB Connection Error: ', error);
        logger.error(error);
    });
}
    
export default {
    init
};