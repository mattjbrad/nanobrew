const expect = require('expect');
const request = require('supertest');

const app = require('../server/app');
const Brew = require('../models/brew');

// beforeEach(populateUsers);
// beforeEach(populateTodos);

describe("All restful routes for GET /brews", ()=>{

    it('Should return the brews', (done)=>{
        request(app)
        .get('/brews')
        .expect(200)
        .end((err, res)=>{
            if (err){
                return done(err);
            }
            done();
        });
    });

    it('Should return a specific brew', (done)=>{
        request(app)
        .get('/brews/123')
        .expect(200)
        .end((err, res)=>{
            if (err){
                return done(err);
            }
            done();
        });
    });

    it('Should return the form for a new brew', (done)=>{
        request(app)
        .get('/brews/new')
        .expect(200)
        .end((err, res)=>{
            if (err){
                return done(err);
            }
            done();
        });
    });

    it('Should return the form for editing a brew', (done)=>{
        request(app)
        .get('/brews/123/edit')
        .expect(200)
        .end((err, res)=>{
            if (err){
                return done(err);
            }
            done();
        });
    });
});

describe('POST /brews', ()=>{
    it('Should create a new brew', (done)=>{
        //Todo
        done();
    });
});