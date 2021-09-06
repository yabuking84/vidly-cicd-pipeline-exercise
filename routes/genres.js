import express from 'express';
const router = express.Router();

import err from '../modules/error.js';
import em from '../middleware/error.js';

import genre from '../repository/genre.js';


router.get('/', async (request,response)=>{
    try {
        const data = await genre.getAllGenres();
        response.send(data);
    } catch (error) {
        err.catchResponse(error,response);   
    }

});

router.get('/page/:page', async (request,response)=>{
    try {
        const data = await genre.getAllGenres(request.params.page);
        response.send(data);
    } catch (error) {
        err.catchResponse(error,response);
    }
});


// get genre by name
router.post('/find', em.asyncRouteHandler( async (request,response)=>{
    const genreFound = await genre.getGenreByName(request.body.name);
    response.send(genreFound);  
}));


// add genre
router.post('/', em.asyncRouteHandler( async (request,response)=>{
    const genreAdded = await genre.addGenre(request.body.name);
    response.send(genreAdded);  
}));




// update genre
router.put('/', async (request,response)=>{
    try {
        const genreUpdated = await genre.updateGenre(request.body.id,request.body.name);
        response.send(genreUpdated);  
    } catch (error) {
        err.catchResponse(error,response);
    }
});



router.delete('/delete', async (request,response)=>{
    try {

        const genreDeleted = await genre.deleteGenre(request.body.id);
        return response.send(genreDeleted);  
    } catch (error) {
        return err.catchResponse(error,response);
    }
});



// module.exports = router;
export default router;
