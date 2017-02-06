import { Request, Response, NextFunction } from "express";

const debug = require("debug");

import PlantController from "./../controllers/plant.controller";

// Middleware for getting and setting plant data
export class PlantService {

    private plantController: PlantController;

    constructor( plantController?: PlantController ) {
        this.plantController = ( typeof plantController !== "undefined" ) ? plantController : new PlantController();
    }

    // get all plants possible
    public getAll = ( req: Request, res: Response, next: NextFunction ) => {

        // create storage variable for the plants
        let plants = [];

        // query the controller function
        return this.plantController.getAll()
        // and wait for response
        .subscribe( ( doc ) => {
            // once a response is received

            // log to debug
            debug( "service getAll: " + JSON.stringify( doc ) );

            // aggregate the results
            plants = plants.concat( doc );
        },
        ( err ) => {
            debug( err );
        },
        () => {
            res.send( { plants: plants } );

            // call next function in express middleware
            next();
        } );
    }

    // filter through request to find request parameters then pass them into the controller function.
    public getOne = ( req: Request, res: Response, next: NextFunction ) => {

        // create storage variable for the plants
        let plants = [];

        // find desired elements in request parameters
        let query: string = req.params.name;

        // query the plant controller with desired parameters
        return this.plantController.getOne( query )
        // and wait for response
        .subscribe( ( doc ) => {
            // once a response is received

            // log to debug
            debug( "service getOne: " + JSON.stringify( doc ) );

            // aggregate the results
            plants = plants.concat( doc );
        },
        ( err ) => {
            debug( err );
        },
        () => {
            // if no plants were found send back a 404
            if ( plants.length < 1 ) res.status( 404 ).send( "Found no plants named:" + query );
            else {
                // send the last plant found in the list
                res.send( plants[ plants.length - 1 ] );
            }

            // call next function in express middleware
            next();
        } );
    }

    public postOne = (req: Request, res: Response, next: NextFunction) => {
        let name = req.body.name;
        let plantingDepth = req.body.plantingDepth;
        let daysToGerminate = req.body.daysToGerminate;
        let avgMaxHeight = req.body.avgMaxHeight;
        let avgMaxDiameter = req.body.avgMaxDiameter;
        let returnedDoc;

        return this.plantController.postOne( name,
                                            plantingDepth,
                                            daysToGerminate,
                                            avgMaxHeight,
                                            avgMaxDiameter )
        .subscribe( ( doc ) => {
            debug( "service putOne: " + JSON.stringify( doc ) );
            returnedDoc = doc;
        },
        ( err ) => {
            debug( err );
        },
        () => {
            res.status( 201 ).send ( returnedDoc );
        } );

    }

}

export default PlantService;