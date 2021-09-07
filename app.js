import express from 'express';

import config from 'config';
import debug from './modules/debug.js';

import routes from './startup/routes.js';
import database from './startup/database.js';
import middlewares from './startup/middlewares.js';
import tawing from './startup/tawing.js';
import checks from './startup/checks.js';
import loggers from './startup/loggers.js';


// START APP
const app = express();

// START LOGGERS
loggers.init(app);

// START MISC CHECKS
checks.init();

// START MONGODB CONNECTION
database.init();

// START MIDDLEWARE
middlewares.init(app);

// START ROUTES
routes.init(app);




// Some random experiments and tests
tawing.init(app);




function start(){
    const PORT = config.has('port')? config.get('port') : 3000;
    return app.listen(PORT,(socket)=>{
        debug.start(`listening to PORT: ${PORT}...`);
    });
}

export default {
    start
};

// testing ci pipeline - should push to staging or something - test 2
