import * as mocha from "mocha";
import * as chai from "chai";
import * as sinon from "sinon";
import * as httpMocks from "node-mocks-http";

import chaiHttp = require( "chai-http" );

const expect = chai.expect;

import PlantService from "./plant.service";

describe ( 'Plant Service', () => {

    describe ( 'getAll', () => {

        var getAllFunc;

        beforeEach( () => {
            getAllFunc = PlantService.getAll; 
        } );
    
        it( 'should be a function?', () => {
            expect( getAllFunc ).to.be.a("function");
        } );

        it( 'should accept three arguments', () => {
            expect( getAllFunc.length ).to.equal(3);
        } );

        it( 'should call through', () => {
            var request = httpMocks.createRequest( {
                method: 'GET',
                url: '/',
                params: {}
            } );
        } );
    
    } );

    describe ( 'getOne', () => {

        var getOneFunc;

        beforeEach( () => {
            getOneFunc = PlantService.getOne; 
        } );
    
        it( 'should be a function?', () => {
            expect( getOneFunc ).to.be.a("function");
        } );

        it( 'should accept three arguments', () => {
            expect( getOneFunc.length ).to.equal(3);
        } )
    
    } );

} );
