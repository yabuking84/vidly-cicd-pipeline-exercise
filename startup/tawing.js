import config from 'config';

import debug from '../modules/debug.js';
import testMiddleware, {var1} from '../middleware/test.js';
import auth0 from '../authentication/auth0.js';
import auth0TestRoute from '../routes/auth0-test.js';
   
import ex_1 from '../experiments/ex_1.js';
import ex_2 from '../experiments/ex_2.js';

// testing if imported modules are being executed, and they are being executed.
// import testRequire from '../modules/experiments/experiment-require.js';

function init(app) {

    // tawing's custom test middleware
    app.use(testMiddleware);
    
    // tawing's test import and export
    debug.def(var1);

    const NODE_ENV = app.get('env');

    // Debuggers
    debug.start("Starting...");
    debug.def("NODE_ENV = ",NODE_ENV);
    debug.def(config.get('name'));
    debug.def(config.get('mail.password'));
    debug.def(config.get('jwt_key'));
    debug.error("test error");

    // Auth0 test
    //////////////////////////////////////////////////////////
    // add Auth0 middleware to /auth0-test
    app.use('/auth0-test',auth0.router);

    // add routes to /auth0-test
    app.use('/auth0-test',auth0TestRoute);
    //////////////////////////////////////////////////////////
    // Auth0 test

    // test on import is being cached
    //////////////////////////////////////////////////////////
    app.get('/exmain1',(request,response)=>{

        ex_2.action_ex2 = function(){
            console.log('replaced in ex3.js');
        };
        
        ex_1.action_ex1('from exmain1');
        response.send(true);
    });

    app.get('/exmain2',(request,response)=>{

        ex_2.action_ex2 = function(){
            console.log('replaced asdsadasd');
        };
        
        ex_1.action_ex1('from exmain2');
        response.send(true);
    });

    app.get('/exmain3',(request,response)=>{

        ex_1.action_ex1('from exmain3');
        response.send(true);
    });
    
    app.get('/breakapp',(request,response)=>{

        // this can actually break the app!! 
        // app.get = function(){
        //     console.log("BREAK!");
        // };
        response.send(true);
        
    });
    //////////////////////////////////////////////////////////
    // test on import is being cached

    debug.def(config.get('auth0.issuerBaseURL'));
    debug.def(config.get('auth0.baseURL'));
    debug.def(config.get('auth0.clientID'));
    debug.def(config.get('auth0.secret'));
    
    
}



export default {
    init
};