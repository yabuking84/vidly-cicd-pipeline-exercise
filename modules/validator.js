import debug from '../modules/debug.js';
import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
Joi.objectId = JoiObjectId(Joi);

import err from './error.js';


function objectId(data) {
    const schema = {
        "id": Joi.objectId().required()
    };    
    return validateData(schema,data);  
}


function genre(data){
    const schema = {
        "name": Joi.string().min(2).required()
    };    
    return validateData(schema,data);
}

function genreDelete(data){
    const schema = {
        "id": Joi.objectId().required()
    };
    return validateData(schema,data);
}

function genreUpdate(data){
    const schema = {
        "id": Joi.objectId().required(),
        "name": Joi.string().min(2).required(),
    };        
    return validateData(schema,data);
}

function customer(data){
    const schema = {
        "name": Joi.string().min(2).required(),
        "rank": Joi.string().min(2)
    };
    return validateData(schema,data);
}

function customerDelete(data){
    const schema = {
        "id": Joi.objectId().required()
    };    
    return validateData(schema,data);
}

function customerUpdate(data){
    const schema = {
        "id": Joi.objectId().required(),
        "name": Joi.string().min(2).required(),
        "rank": Joi.string().min(2)
    };    
    return validateData(schema,data);

}


function movie(data) {
    const schema = {
        "name": Joi.string().min(2).required(),
        "genreId": Joi.objectId().required(),
        "inStock": Joi.number().integer().min(0).max(999),
        "dailyRentalRate": Joi.number().positive().required()
    };    
    return validateData(schema,data);  
}



function movieUpdate(data) {
    const schema = {
        "id": Joi.objectId().required(),
        "name": Joi.string().min(2),
        "genreId": Joi.objectId(),
        "dailyRentalRate": Joi.number().positive()
    };    
    return validateData(schema,data);
}

function movieDelete(data) {
    const schema = {
        "id": Joi.objectId().required()
    };    
    return validateData(schema,data);
}




function rental(data) {
    const schema = {
        "customerId": Joi.objectId().required(),
        "movieId": Joi.objectId().required()
    };    

    return validateData(schema,data);
}



function user(data) {
    const schema = {
        "name": Joi.string().min(2).required(),
        "email": Joi.string().min(5).max(255).email({ minDomainSegments: 2}).required(),
        "contactNo": Joi.string().min(5).max(20),
        "password": Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        "password_confirm": Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        // "password_confirm": Joi.ref('password')
        // "password_confirm": Joi.valid(Joi.ref('password'))
    };
    return validateData(schema,data, (obj, helpers)=>{
        // access to the full object above.
        const { password,password_confirm } = obj;

        // Do your validation
        const isValid = (password===password_confirm);

        if (!isValid) 
        err.throwError('InvalidPassword','Password is different!');
        
        // Just pass the object on through if things work.
        return obj;
    });
}



function userLogin(data) {
    const schema = {
        "email": Joi.string().min(5).max(255).email({ minDomainSegments: 2}).required(),
        "password": Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    };
    return validateData(schema,data);
}



function validateData(schema,data,customFunction=false) {

    let validateError;

    if(!customFunction)
    validateError =  Joi.object(schema).validate(data).error;
    else
    validateError =  Joi.object(schema).custom(customFunction).validate(data).error;

    if(validateError) 
    err.throwError('InvalidInput',validateError.details[0].message);  
    
    return validateError;
}


export default {
    objectId,
    genre,
    genreDelete,
    genreUpdate,
    customer,
    customerDelete,
    customerUpdate,
    movie,
    movieUpdate,
    movieDelete,
    rental,
    user,
    userLogin
};