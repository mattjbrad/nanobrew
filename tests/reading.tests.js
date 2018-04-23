const expect = require('expect');
const request = require('supertest');

const app = require('../server/app');
const Brew = require('../models/reading');

// beforeEach(populateUsers);
// beforeEach(populateTodos);

describe("All restful routes for GET /reading", ()=>{

    it('Should return the readings', (done)=>{
        request(app)
        .get('/reading')
        .expect(200)
        .end((err, res)=>{
            if (err){
                return done(err);
            }
            done();
        });
    });

    it('Should return a specific reading', (done)=>{
        request(app)
        .get('/reading/123')
        .expect(200)
        .end((err, res)=>{
            if (err){
                return done(err);
            }
            done();
        });
    });

    it('Should return the form for a new reading', (done)=>{
        request(app)
        .get('/reading/new')
        .expect(200)
        .end((err, res)=>{
            if (err){
                return done(err);
            }
            done();
        });
    });

    it('Should return the form for a editing a reading', (done)=>{
        request(app)
        .get('/reading/123/edit')
        .expect(200)
        .end((err, res)=>{
            if (err){
                return done(err);
            }
            done();
        });
    });
});

describe('POST /reading', ()=>{
    it('Should create a new brew', (done)=>{
        //Todo
        done();
    });
});