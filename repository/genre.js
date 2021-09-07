import validator from '../modules/validator.js';
import  err from '../modules/error.js';
import em from '../middleware/error.js';


function getAllGenres(page=0){ return new Promise(async (resolve, reject)=>{
    try {
           
        const pageNum = (page>0)?page:1;
        const pageSize = (page>0)?3:0;

        const genresFound = await Genre
        .find()
        .select('-__v')
        .skip((pageNum-1)*pageSize)
        .limit(pageSize);

        if(genresFound.length)
        return resolve(genresFound);
        else 
        err.throwError('Empty','Genres empty!');        
    } catch (error) {
        err.catchReject(error ,reject);
    }

});}



function getGenreByName(name){ return em.asyncPromiseHandler( async (resolve,reject)=>{
    // validate input
    validator.genre({
        name
    });

    const genreFound = await Genre
    .findOne({name})
    .select({
        name:1
    });

    if(genreFound)
    return resolve(genreFound);
    else 
    err.throwError('NotFound','Genre not found!');    
});}


function countGenre(genreId){return new Promise(async(resolve,reject)=>{
    try {
        const qty = await Genre.countDocuments({_id:genreId});
        resolve(qty);
    } catch (error) {
        err.catchReject(error ,reject);
    }
});}




function addGenre(name){ return errMiddleware.asyncPromiseHandler( async (resolve,reject)=>{
    // validate input
    validator.genre({
        name
    });

    const genreNew = new Genre({
        name: name
    });
    const retVal = await genreNew.save();
    resolve(retVal);
});}



function updateGenre(id,name){return new Promise(async (resolve,reject)=>{
    try {
        validator.genreUpdate({id,name});

        const genreUpdated = await Genre.findOneAndUpdate({
            _id: id
        },{
            $set: {
                name
            }
        }, {
            new: true
        });
        if(genreUpdated)
        resolve(genreUpdated);
        else
        err.throwError('NotFound','Update failed! Genre not found!');

    } catch (error) {
        err.catchReject(error ,reject);
    }
});}


function deleteGenre(id){return new Promise(async(resolve,reject)=>{
    try {
        validator.genreDelete({id});

        const genreDeleted = await Genre.findOneAndDelete({
            _id: id
        });
        if(genreDeleted)
        resolve(genreDeleted);
        else
        err.throwError('NotFound','Delete failed! Genre not found!');        
        
    } catch (error) {
        err.catchReject(error ,reject);
    }
});}










export {countGenre};


export default {
    getAllGenres,
    getGenreByName,
    countGenre,
    addGenre,
    updateGenre,
    deleteGenre    
};