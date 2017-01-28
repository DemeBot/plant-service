import { Request, Response, NextFunction } from "express";

const debug = require("debug");

import PlantController from "./../controllers/plant.controller";

// Middleware for getting and setting plant data
export class PlantService {

    public getAll( req: Request, res: Response, next: NextFunction ) {
        return PlantController.getAll().subscribe( ( doc ) => {
            debug( "service getAll: " + JSON.stringify( doc ) );
            res.send( { plants: doc } );
            next();
        } );
    };

    // filter through rquest to find request parameters then pass them into the controller function.
    public getOne( req: Request, res: Response, next: NextFunction ) {
        let query: string = req.params.name;

        return PlantController.getOne( query ).subscribe( ( doc ) => {
            debug( "service getOne: " + JSON.stringify( doc ) );
            res.send( { plant: doc } );
            next();
        } );
    };

}

const plantService = new PlantService();

export default plantService;