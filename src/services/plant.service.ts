import { Request, Response, NextFunction } from "express";

const debug = require("debug");

import PlantController from "./../controllers/plant.controller";
import PlantInterface from "./../models/plant.interface";

// Middleware for getting and setting plant data
export class PlantService {

    private plantController: PlantController;

    constructor( plantController?: PlantController ) {
        this.plantController = ( typeof plantController !== "undefined" ) ? plantController : new PlantController();
    }

    // get all plants possible
    public get = ( request: Request, response: Response, next: NextFunction ) => {


        // find desired elements in request parameters
        let get_deleted: boolean = request.query.get_deleted;
        let id: number = request.query.id;
        let name: string = request.query.name;

        // query the controller function
        this.plantController
        .get( id, name, get_deleted )
        .then( ( plants: PlantInterface[] ) => {
            if ( plants.length < 1 ) response.status( 404 ).send();
            else {
                response.status( 200 ).send( { plants : plants } );
            }
        } )
        .catch( ( error: Error ) => {
            console.log( error );
            response.status( 500 ).send("Server error");
        } );
    }

    public post = ( request: Request, response: Response, next: NextFunction ) => {
        let name = request.body.name;
        let depth = request.body.depth;
        let days_to_germinate = request.body.days_to_germinate;
        let height = request.body.height;
        let width = request.body.width;
        let description = request.body.description;
        let returnedDoc;

        return this.plantController
        .post(
            name,
            depth,
            days_to_germinate,
            height,
            width,
            description
        )
        .then( ( new_plant: PlantInterface ) => {
            console.log( JSON.stringify( new_plant ) );
            response.status( 201 ).send( new_plant );
        } )
        .catch( ( error: Error ) => {
            console.log( error );
            response.status( 500 ).send("Server error");
        } );

    }

    public delete = ( parameter: Request, response: Response, next: NextFunction ) => {
        let id = parameter.body.id;

        return this.plantController
        .delete( id )
        .then( ( deletedPlants: PlantInterface[] ) => {
            console.log( "deleted plant id: " + id );
            if ( deletedPlants.length > 0 )response.status( 204 ).send( deletedPlants );
            response.status( 404 ).send();
        } )
        .catch( ( error: Error ) => {
            console.log( error );
            response.status( 500 ).send();
        } );
    }

}

export default PlantService;