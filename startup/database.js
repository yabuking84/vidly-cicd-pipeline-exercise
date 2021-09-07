import mongoose from 'mongoose';
import debug from '../modules/debug.js';
import logger from '../modules/logger.js';

import config from 'config';

const dbConnectionUrl = config.get('db.connectionUrl');

function init() {
    // must configure mongodb to enable replica set to make transactions work
    mongoose.connect(dbConnectionUrl,{
        'useNewUrlParser': true,
        'useFindAndModify': false,
        'useCreateIndex': true,
        'useUnifiedTopology': true
    })
    .then(()=>{
        debug.def(`Connected to ${dbConnectionUrl}..`);
    })
    .catch((error)=>{
        debug.db(`DB Connection Error to ${dbConnectionUrl}: `, error);
        logger.error(error);
    });
}
    
export default {
    init
};