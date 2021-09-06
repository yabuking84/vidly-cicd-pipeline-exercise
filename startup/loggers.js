import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import logger from '../modules/logger.js';

function init(app){

    // HANDLE EXCEPTIONS ERRORS
    logger.initHandleExceptions();

    // Morgan Logger for http access logs
    // HTTP request logger. create a write stream (in append mode) to write to log file
    const __dirname = path.resolve();
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })
    app.use(morgan('tiny', { stream: accessLogStream }));


}



export default {
    init
};