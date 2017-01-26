import * as mocha from 'mocha';
import * as chai from 'chai';

import chaiHttp = require( 'chai-http' );

import app from './../app';

chai.use( chaiHttp );
const expect = chai.expect;

describe ( 'GET api/v1/plants', () => {

    it( 'responds with JSON array', () => {
        return chai.request(app).get('/api/v1/plants')
        .then( res => {
            expect( res.status ).to.equal(200);
            expect( res ).to.be.json;
            expect( res.body ).to.be.an('array');
            expect( res.body ).to.have.length(0);
        } );
    } );

    it( 'should include Lettuce', () => {
        return chai.request(app).get('/api/v1/plants')
        .then( res => {
            let Lettuce = res.body.find( plant => plant.name === 'Lettuce' );
            expect( Lettuce ).to.exist;
            expect( Lettuce ).to.have.all.keys([
                'id',
                'name'
            ]);
        } );
    } )
} );