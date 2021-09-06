import express from "express";
const router = express.Router();
import  err from '../modules/error.js';

import movie from "../repository/movie.js";

import debug from '../modules/debug.js';

router.get('/', async(request,response)=>{
    try {
        const moviesFound = await movie.getAllMovies();
        response.send(moviesFound);
    } catch (error) {
        err.catchResponse(error,response);
    }
});

router.get('/page/:page', async (request,response)=>{
    try {
        const data = await movie.getAllMovies(request.params.page);
        response.send(data);
    } catch (error) {
        err.catchResponse(error,response);
    }
});

router.post('/',async(request,response)=>{
    try {
        const movieAdded = await movie.addMovie(
            request.body.name,
            request.body.genreId,
            request.body.inStock,
            request.body.dailyRentalRate
        );
        response.send(movieAdded);
    } catch (error) {
        err.catchResponse(error,response);
    }
});


router.put('/',async(request,response)=>{
    try {
        const movieUpdated = await movie.updateMovie(
            request.body.movieId,
            request.body.name,
            request.body.genreId,
            request.body.dailyRentalRate
        );
        response.send(movieUpdated);
    } catch (error) {
        err.catchResponse(error,response);
    }
});



router.delete('/',async(request,response)=>{
    try {
        const movieDeleted = await movie.deleteMovie(
            request.body.movieId
        );
        response.send(movieDeleted);
    } catch (error) {
        err.catchResponse(error,response);
    }
});




export default router;
