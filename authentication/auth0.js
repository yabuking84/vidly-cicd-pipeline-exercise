import auth0 from 'express-openid-connect'; 
// import jwt from 'express-jwt';
// import jwks from 'jwks-rsa';


import config from "config";
const router = auth0.auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: config.get('auth0.issuerBaseURL'),
    baseURL: config.get('auth0.baseURL')+'/auth0-test',
    clientID: config.get('auth0.clientID'),
    secret: config.get('auth0.secret'),
    routes: {
        callback: '/callback',
        logout:'/logout',
        login:'/login'
    }
    // idpLogout: true,
});

// var middleware = jwt({
//     secret: jwks.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: 'https://yabuking84.auth0.com/.well-known/jwks.json'
//   }),
//   audience: 'vidly-api',
//   issuer: 'https://yabuking84.auth0.com/',
//   algorithms: ['RS256']
// });

export default {
    router,
    middleware: auth0.requiresAuth
};


