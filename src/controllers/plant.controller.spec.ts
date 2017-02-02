import * as mocha from "mocha";
import * as chai from "chai";
import * as sinon from "sinon";

const expect = chai.expect;

import { Observable } from "rxjs/Observable";
import * as NeDB from "nedb";

import PlantController from "./plant.controller";

const mockData = [
    { "name": "lettuce", "plantingDepth": 25, "daysToGerminate": 2, "avgMaxHeight": 300, "avgMaxDiameter": 300, "_id": "FkJhaxNHNSGq5XEe"},
    { "name": "chives", "plantingDepth": 10, "daysToGerminate": 21, "avgMaxHeight": 450, "avgMaxDiameter": 150, "_id": "KDoR2olxPFsmsrPA"},
    { "name": "sage", "plantingDepth": 5, "daysToGerminate": 20, "avgMaxHeight": 750, "avgMaxDiameter": 600, "_id": "SGFjq2hYopkV6v3k"},
    { "name": "dill", "plantingDepth": 10, "daysToGerminate": 10, "avgMaxHeight": 1200, "avgMaxDiameter": 750, "_id": "fODAKp2jOOx8Obtl"},
    { "name": "parsley", "plantingDepth": 5, "daysToGerminate": 25, "avgMaxHeight": 750, "avgMaxDiameter": 750, "_id": "p2WfPSLkFoRlphFX"},
];

describe ( "Plant Controller", () => {

    let db: any;
    let plantController: PlantController;


    describe ( "getAll()", () => {

        before( ( done ) => {

            db = new NeDB( { autoload: true } );

            mockData.forEach( ( doc ) => {
                db.insert( doc, ( err, newDoc ) => {
                    if ( err ) throw err;
                } );
            } );

            plantController = new PlantController( db );

            done();

        } );

        it( "should return an array", ( done ) => {
            let retObs = plantController.getAll();

            retObs.subscribe( ( docs ) => {
                expect( docs ).to.be.an("array");
                done();
            } );
        } );

        it( "should return the mock data", ( done ) => {
            let retObs = plantController.getAll();

            retObs.subscribe( ( docs ) => {
                expect( docs ).to.deep.equal( mockData );
                done();
            } );
        } );

        it( "should return the correct number of objects", ( done ) => {
            let retObs = plantController.getAll();

            retObs.subscribe( ( docs ) => {
                expect( docs.length ).to.equal(mockData.length);
                done();
            } );
        } );

    } );

    describe ( "getOne()", () => {

        before( (done) => {

            db = new NeDB( { autoload: true } );

            db.insert( mockData[0], ( err, newDoc ) => {
                if ( err ) throw err;
            } );

            plantController = new PlantController( db );

            done();

        } );

        it( "should return an object", ( done ) => {
            let retObs = plantController.getOne( "lettuce" );

            retObs.subscribe( ( docs ) => {
                expect( docs ).to.be.an( "object" );
                done();
            } );
        } );

        it( "should return the mock data", ( done ) => {
            let retObs = plantController.getOne( "lettuce" );

            retObs.subscribe( ( docs ) => {
                expect( docs ).to.deep.equal(mockData[0]);
                done();
            } );
        } );

        it( "should return the correct number of properties", ( done ) => {
            let retObs = plantController.getOne( "lettuce" );

            retObs.subscribe( ( docs ) => {
                expect( Object.keys( docs ).length ).to.equal( Object.keys( mockData[0] ).length );
                done();
            } );
        } );

    } );

} );