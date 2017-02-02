import { Observable } from "rxjs/Observable";
import * as NeDB from "nedb";

const debug = require("debug");

import PlantInterface from "./../data/models/plant.interface";

export class PlantController {

    private DB: NeDB;

    constructor( DB?: NeDB ) {
        // instantiate DB by first checking for injected DB and creating one if one wasn't injected
        this.DB = ( typeof DB !== "undefined" ) ? DB : new NeDB( { filename: __dirname + "/../data/plant.db", autoload: true } );
    }

    // Call NeDB plant database for all plants
    public getAll = () => {
        // return observable so that a caller can subscribe to it and wait for a response
        return Observable.create( observer => {
            // get all results from DB by searching for any match
            this.DB.find( {}, ( err: Error, docs: PlantInterface[] ) => {
                // if an error is found, pass the error to the subscriber
                if ( err ) observer.error( err );
                // otherwise pass any results found to the subscriber
                else {
                    // log to debug
                    debug( "controller getAll: " + JSON.stringify( docs ) );

                    // notify subscribers of a response
                    observer.next( docs as PlantInterface[] );
                }

                // close observable
                observer.complete();
            } );
        } );
    }

    // Find plants matching requested name
    public getOne = ( name: string ) => {
        // return observable so that a caller can subscribe to it and wait for a response
        return Observable.create( observer => {
            // get results which match desire name from DB by searching for a match
            this.DB.find( { name: name }, ( err: Error, docs: PlantInterface[] ) => {
                // if an error is found, pass the error to the subscriber
                if ( err ) {
                    debug( err );
                    observer.error( err );
                }
                else if ( docs.length === 0 ) {
                    debug("NO DOCS FOUND");
                }
                // otherwise pass any results found to the subscriber
                else {
                    docs.forEach( ( doc ) => {
                        debug( "controller getAll: " + JSON.stringify( doc ) );
                        observer.next( doc as PlantInterface );
                    } );
                }

                // close observable
                observer.complete();
            } );
        } );
    }
}

export default PlantController;