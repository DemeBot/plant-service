import { Request, Response, NextFunction } from "express";

const debug = require("debug");

import PlantController from "./../controllers/plant.controller";

// Middleware for getting and setting plant data
export class PlantService {

    private plantController: PlantController;

    constructor( plantController?: PlantController ) {
        this.plantController = ( typeof plantController !== "undefined" ) ? plantController : new PlantController();
    }

    public getAll = ( req: Request, res: Response, next: NextFunction ) => {
        this.plantController.getAll().subscribe( ( doc ) => {
            debug( "service getAll: " + JSON.stringify( doc ) );
            res.send( { plants: doc } );
            next();
        } );
    }

    // filter through rquest to find request parameters then pass them into the controller function.
    public getOne = ( req: Request, res: Response, next: NextFunction ) => {
        let query: string = req.params.name;

        this.plantController.getOne( query ).subscribe( ( doc ) => {
            debug( "service getOne: " + JSON.stringify( doc ) );
            res.send( doc );
            next();
        } );
    }

}

export default PlantService;