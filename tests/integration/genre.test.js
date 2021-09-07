import app from '../../index.js';
let server;

describe('/api/genres', ()=>{
    beforeEach(()=>{
        server = app.start();
    });
    afterEach(()=>{
        server.close();
    });

    describe('GET / ',()=>{
        it('should return all genres',()=>{

        });
    });
});