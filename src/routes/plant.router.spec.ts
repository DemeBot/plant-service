import * as mocha from 'mocha';
import * as chai from 'chai';

import chaiHttp = require( 'chai-http' );

import app from './../app';

chai.use( chaiHttp );
const expect = chai.expect;

describe ( 'GET api/v1/plants', () => {

    it( 'responds with JSON array', () => {
        return chai.request( app ).get( '/api/v1/plants' )
        .then( res => {
            expect( res.status ).to.equal(200);
            expect( res ).to.be.json;
            expect( res.body.plants ).to.be.an( 'array' );
            expect( res.body.plants ).to.have.length(5);
        } );
    } );

    it( 'should include lettuce', () => {
        return chai.request( app ).get( '/api/v1/plants' )
        .then( res => {
            let Lettuce = res.body.plants.find( plant => plant.name === 'lettuce' );
            expect( Lettuce ).to.exist;
            expect( Lettuce ).to.have.all.keys([
                '_id',
                'name',
                'plantingDepth',
                'daysToGerminate',
                'avgMaxHeight',
                'avgMaxDiameter'
            ]);
        } );
    } )
} );

describe ( 'GET /api/v1/plants/:name', () => {

    it( 'responds with a single JSON object', () => {
        return chai.request(app).get( '/api/v1/plants/lettuce' )
        .then( res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
        } );
    } );

    it( 'responds with a single JSON object', () => {
        return chai.request(app).get( '/api/v1/plants/lettuce' )
        .then( res => {
            expect( res.body.plant.name ).to.equal( 'lettuce' );
        } );
    } );

} );