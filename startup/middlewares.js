import express from 'express';
import helmet from 'helmet';

function init(app) {

    // set public folder 
    app.use(express.static('public'));

    // make data from requests in json format
    app.use(express.json());

    // make data from url in encoded
    app.use(express.urlencoded({extended:true}));    

    // Helps secure your apps by setting various HTTP headers.
    app.use(helmet());    

 

}


export default {
    init
};