import * as mocha from "mocha";
import * as chai from "chai";

import chaiHttp = require( "chai-http" );

import App from "./../src/app";

import PlantService from "./services/plant.service"
import PlantRouter from "./routes/plant.router"
import PlantController from "./controllers/plant.controller"

import * as NeDB from "NeDB";

chai.use( chaiHttp );
const expect = chai.expect;

const mockData = [
    { "name": "lettuce", "plantingDepth": 25, "daysToGerminate": 2, "avgMaxHeight": 300, "avgMaxDiameter": 300, "_id": "FkJhaxNHNSGq5XEe"},
    { "name": "chives", "plantingDepth": 10, "daysToGerminate": 21, "avgMaxHeight": 450, "avgMaxDiameter": 150, "_id": "KDoR2olxPFsmsrPA"},
    { "name": "sage", "plantingDepth": 5, "daysToGerminate": 20, "avgMaxHeight": 750, "avgMaxDiameter": 600, "_id": "SGFjq2hYopkV6v3k"},
    { "name": "dill", "plantingDepth": 10, "daysToGerminate": 10, "avgMaxHeight": 1200, "avgMaxDiameter": 750, "_id": "fODAKp2jOOx8Obtl"},
    { "name": "parsley", "plantingDepth": 5, "daysToGerminate": 25, "avgMaxHeight": 750, "avgMaxDiameter": 750, "_id": "p2WfPSLkFoRlphFX"},
];


let plantController;
let plantService;
let plantRouter;

let app;

describe ( "GET api/v1/plants", () => {

    let db;

    before( ( done ) => {

        db = new NeDB( { autoload: true } );

        mockData.forEach( ( doc ) => {
            db.insert( doc, ( err, newDoc ) => {
                if ( err ) throw err;
            } );
        } );

        plantController = new PlantController( db );
        plantService = new PlantService( plantController );
        plantRouter = new PlantRouter( plantService );

        app = new App(plantRouter).express;

        done();

    } );

    it( "responds with JSON array", () => {
        return chai.request( app ).get( "/api/v1/plants" )
        .then( res => {
            expect( res.status ).to.equal(200);
            expect( res ).to.be.json;
            expect( res.body.plants ).to.be.an( "array" );
            expect( res.body.plants ).to.have.length(5);
        } );
    } );

    it( "should include lettuce", () => {
        return chai.request( app ).get( "/api/v1/plants" )
        .then( res => {
            let Lettuce = res.body.plants.find( plant => plant.name === "lettuce" );
            expect( Lettuce ).to.exist;
            expect( Lettuce ).to.have.all.keys([
                "_id",
                "name",
                "plantingDepth",
                "daysToGerminate",
                "avgMaxHeight",
                "avgMaxDiameter"
            ]);
        } );
    } );

} );


describe ( "GET /api/v1/plants/:name", () => {

    let db;

    before( ( done ) => {

        db = new NeDB( { autoload: true } );

        mockData.forEach( ( doc ) => {
            db.insert( doc, ( err, newDoc ) => {
                if ( err ) throw err;
            } );
        } );

        plantController = new PlantController( db );
        plantService = new PlantService( plantController );
        plantRouter = new PlantRouter( plantService );

        app = new App(plantRouter).express;

        done();

    } );

    it( "responds with a single JSON object", () => {
        return chai.request( app ).get( "/api/v1/plants/lettuce" )
        .then( res => {
            expect( res.status ).to.equal( 200 );
            expect( res ).to.be.json;
            expect( res.body ).to.be.an("object");
        } );
    } );

    it( "responds with a single JSON object", () => {
        return chai.request( app ).get( "/api/v1/plants/lettuce" )
        .then( res => {
            expect( res.body.name ).to.equal( "lettuce" );
        } );
    } );

} );
