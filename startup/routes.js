import genres from '../routes/genres.js';
import customers from '../routes/customers.js';
import movies from '../routes/movies.js';
import rentals from '../routes/rentals.js';
import users from '../routes/users.js';
import auth from '../routes/auth.js';

import error from '../middleware/error.js';


function init(app){
    app.use('/api/genres',genres);
    app.use('/api/customers',customers);
    app.use('/api/movies',movies);
    app.use('/api/rentals',rentals);
    app.use('/api/users',users);
    app.use('/api/auth',auth);
    
    // test middleware with response
    app.use('/route-test',(request,response,next)=>{
        console.log('/route-test middleware');
        response.send('middleware with response!');
    });
    
    // shutdown nodejs 
    // not working, make it work later
    app.get('/shutdown/nodejs/gracefully',(request,response)=>{
        process.on('SIGTERM', () => {
            console.log('Process terminating gracefully..');
            server.close(() => {
              console.log('Process terminated gracefully!');
            });
        });   
    });
    app.get('/shutdown/nodejs/immediately',(request,response)=>{
        process.exit(); // or use SIGKILL 
    });
    
    
    // shutdown mongodb
    app.get('/shutdown/mongodb/gracefully',(request,response)=>{
        mongoose.connection.db.command({
            shutdown : 1
        }, function(err, result) {
            console.log('mongodb shutdown - ', err.message);
        });
        response.send('shutting down mongodb... ');
    });
    
    // error middleware
    app.use(error.middleware);    
}


export default {
    init
};