import debug from './debug.js';

function catchResponse(error,response, status=400) {
    try {
        debug.error('Response Error Name:',error.name);
        debug.error('Response Error:',error.message);
        
        if(error.name == 'NotFound') 
        status = 404;
        if(error.name == 'MongooseServerSelectionError') 
        status = 500;

        return response.status(status).send(error.message);
    } catch (err) {
        debug.error(err);
        debug.error('Response catchResponse Error:',err);
        let status = 400; 
        return response.status(status).send(err);
    }        
}



function catchReject(error,reject){
    try {
        debug.error('Reject Error:',error.message);
        // check if from mongoose validation error
        if(error.name === 'ValidationError' ) {
            debug.error('Mongoose ValidationError Error:',error.message);
            for(let field in error.errors) {
                debug.error('Mongoose ValidationError error.errors:',error.errors[field].message);
            }
            return reject(error);
        }
        else
        return reject(error);
    } catch (err) {
        return reject(err);
    }      
}



function throwError(errorName,errorMessage){
    debug.error('Throw Error:',errorMessage);
    const error = new Error(errorMessage);
    error.name = errorName; 
    throw error;
}


function createError(errorName,errorMessage){
    debug.error('Get Error:',errorMessage);
    const error = new Error(errorMessage);
    error.name = errorName; 
    return error;
}



export default {
    catchResponse,
    catchReject,
    throwError,
    createError
};


