import expectCt from 'helmet/dist/middlewares/expect-ct';
import request from 'supertest';
import app from '../../index.js';
import genreModel from '../../model/genre.js';

let server;

describe('/api/genres', ()=>{
    beforeEach(()=>{
        server = app.start();
    });
    afterEach(()=>{
        server.close();
    });

    describe('GET / ',()=>{
        it('should return all genres', async ()=>{
            const Genre = genreModel.Model;
            await Genre.collection.insertMany([
                {name: "genre1"},
                {name: "genre2"},
                {name: "genre3"}
            ]);

            const response = await request(server).get('/api/genres');

            expect(response.status).toBe(200);
            expect(response.body).length.toBe(200);
        });
    });
});