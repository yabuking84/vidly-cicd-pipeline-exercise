import validator from '../modules/validator.js';

import debug from '../modules/debug.js';


import _ from "lodash";

import  err from '../modules/error.js';
import mongoose from 'mongoose';

import {countGenre as countTheGenre} from './genre.js';
import { movieSchema } from '../schema/movie.js';

const Movie  = mongoose.model('Movies',movieSchema);



function getModel(){
    return Movie;    
}


function getAllMovies(page=0){return new Promise(async(resolve,reject)=>{
    try {
        const pageNum = (page>0)?page:1;
        const pageSize = (page>0)?3:0;

        const moviesFound = await Movie
        .find()
        .populate('genre')
        .skip((pageNum-1)*pageSize)
        .limit(pageSize);

        if(moviesFound.length)
        resolve(moviesFound);
        else
        err.throwError('Empty','Movies empty!');
    } catch (error) {
        err.catchReject(error ,reject);
    }
});}

function addMovie(name,genreId,inStock,dailyRentalRate){return new Promise(async(resolve,reject)=>{
    try {
        validator.movie({
            name,
            genreId,
            inStock,
            dailyRentalRate
        });

        // using count instead of findOneById because i dont need to get all the data and its faster 
        const genre = await countTheGenre(genreId);
        if(genre<1) err.throwError('NotFound','Genre not found!');


        const movieNew = new Movie({
            name,
            genre:genreId,
            inStock,
            dailyRentalRate
        });
        const retVal = movieNew.save();

        resolve(retVal);

    } catch (error) {
        err.catchReject(error ,reject);
    }
});}



function updateMovie(movieId,newName,newGenreId,dailyRentalRate){return new Promise(async (resolve,reject)=>{
    try {
        validator.movieUpdate({
            id: movieId,
            name: newName,
            genreId: newGenreId,
            dailyRentalRate: dailyRentalRate
        });
        
        let movieProps = {};

        if(newName) {
            movieProps = {
                ...movieProps,
                name: newName 
            };
        }

        if(newGenreId) {
            const genre = await countTheGenre(newGenreId);
            if(genre<1) err.throwError('NotFound','Genre not found!');
            
            movieProps = {
                ...movieProps,
                genre: newGenreId 
            };
        }

        if(dailyRentalRate) {
            movieProps = {
                ...movieProps,
                dailyRentalRate: dailyRentalRate 
            };
        }

        if(!_.isEmpty(movieProps)) {
            const movieUpdated = await Movie.findOneAndUpdate({
                _id: movieId,
            },{
                $set: {
                    ...movieProps    
                }
            },{
                new: true
            })
            .populate('genre');
            resolve(movieUpdated);
        } else  
        resolve("Nothing to update!");

    } catch (error) {
        err.catchReject(error ,reject);
    }
});}


function deleteMovie(movieId){return new Promise(async (resolve,reject)=>{
    try {
        validator.movieDelete({id: movieId});

        const movieDeleted = await Movie.findOneAndDelete({
            _id: movieId
        });
        if(movieDeleted)
        resolve(movieDeleted);
        else
        err.throwError('NotFound','Delete failed! Movie not found!');
        
    } catch (error) {
        err.catchReject(error ,reject);
    }
});}



function findMovieById(movieId){return new Promise(async(resolve,reject)=>{
    try {
        validator.objectId({id:movieId});
        const movie = await Movie.findById(movieId).populate('genre','-__v');
        if(movie) 
        resolve(movie);
        else
        err.throwError('NotFound','Movie not found!');        
    } catch (error) {
        err.catchReject(error,reject);
    }
});}





export {findMovieById};

export default {
    getModel,
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    findMovieById    
};