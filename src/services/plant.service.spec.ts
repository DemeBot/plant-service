import * as mocha from "mocha";
import * as chai from "chai";
import * as sinon from "sinon";
import * as httpMocks from "node-mocks-http";

import { Observable } from "rxjs/Observable";

const expect = chai.expect;

import { PlantService } from "./plant.service";
import { PlantController } from "./../controllers/plant.controller";

const mockData = [
    { "name": "lettuce", "plantingDepth": 25, "daysToGerminate": 2, "avgMaxHeight": 300, "avgMaxDiameter": 300, "_id": "FkJhaxNHNSGq5XEe"},
    { "name": "chives", "plantingDepth": 10, "daysToGerminate": 21, "avgMaxHeight": 450, "avgMaxDiameter": 150, "_id": "KDoR2olxPFsmsrPA"},
    { "name": "sage", "plantingDepth": 5, "daysToGerminate": 20, "avgMaxHeight": 750, "avgMaxDiameter": 600, "_id": "SGFjq2hYopkV6v3k"},
    { "name": "dill", "plantingDepth": 10, "daysToGerminate": 10, "avgMaxHeight": 1200, "avgMaxDiameter": 750, "_id": "fODAKp2jOOx8Obtl"},
    { "name": "parsley", "plantingDepth": 5, "daysToGerminate": 25, "avgMaxHeight": 750, "avgMaxDiameter": 750, "_id": "p2WfPSLkFoRlphFX"},
];

describe ( "Plant Service", () => {

    let plantService: PlantService;
    let plantController: any;

    before( () => {
        plantController = new PlantController();
        plantService = new PlantService( plantController );
    } );

    describe ( "getAll()", () => {

        let callResult;
        let request, response, next;

        before( () => {
            let observer = Observable.create( observer => {
                observer.next( mockData );
                observer.complete();
            } );

            sinon.stub( plantController, "getAll", () => { return observer; } );
        } );

        after( () => {
            plantController.getAll.restore();
        } );

        beforeEach( () => {

            request = httpMocks.createRequest( {
                method: "GET",
                url: "/",
                params: {}
            } );

            response = {
                send: ( input ) => {
                    callResult = input;
                }
            };

            next = () => {};

        } );

        it( "should return an object", () => {
            plantService.getAll( request, response, next );
            expect( callResult ).to.be.an( "object" );
        } );

        it( "should have plants property", () => {
            plantService.getAll( request, response, next );
            expect( callResult ).to.haveOwnProperty( "plants" );
        } );

        it( "should get back mock data in plants property", () => {
            plantService.getAll( request, response, next );
            expect( callResult.plants.length ).to.equal( mockData.length );
            expect( callResult.plants ).to.deep.equal( mockData );
        } );

    } );

    describe ( "getOne()", () => {

        let callResult;
        let request, response, next;

        before( () => {
            let observer = Observable.create( observer => {
                observer.next( mockData[0] );
                observer.complete();
            } );

            sinon.stub( plantController, "getOne", () => { return observer; } );
        } );

        after( () => {
            plantController.getOne.restore();
        } );

        beforeEach( () => {

            request = httpMocks.createRequest( {
                method: "GET",
                url: "/",
                params: {}
            } );

            response = {
                send: ( input ) => {
                    callResult = input;
                }
            };

            next = () => {};

        } );

        it( "should return an object", () => {
            plantService.getOne( request, response, next );
            expect( callResult ).to.be.an( "object" );
        } );

        it( "should have name property", () => {
            plantService.getOne( request, response, next );
            expect( callResult ).to.haveOwnProperty( "name" );
            expect( callResult.name ).to.equal( "lettuce" );
        } );

        it( "should get back mock data", () => {
            plantService.getOne( request, response, next );
            expect( Object.keys( callResult ).length ).to.equal( Object.keys( mockData[0] ).length );
            expect( callResult ).to.equal( mockData[0] );
        } );

    } );

} );
