import config from 'config';

import debug from '../modules/debug.js';
import err from '../modules/error.js';
import logger from '../modules/logger.js';

function init(){

    // check for needed variables
    try {
        if(!config.has('jwt_key') || !config.get('jwt_key'))
        err.throwError('StartupError','JWT Private Key not defined!');        
    } catch (error) {
        debug.error(error.message);
        logger.error(error);
        process.exit(1);
    }

}


export default {
    init
};