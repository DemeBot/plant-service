import { Observable } from "rxjs/Observable";
import * as NeDB from "nedb";

const debug = require("debug");

import PlantInterface from "./../data/models/plant.interface";

export class PlantController {

    private DB: NeDB;

    constructor( DB?: NeDB ) {
        this.DB = ( typeof DB !== "undefined" ) ? DB : new NeDB( { filename: __dirname + "/../data/plant.db", autoload: true } );
    }

    // Call NeDB plant database for all plants
    public getAll = () => {
        return Observable.create( observer => {
            this.DB.find( {  }, ( err: Error, docs: PlantInterface[] ) => {
                if ( err ) observer.error( err );
                debug( "controller getAll: " + JSON.stringify( docs ) );
                observer.next( docs as PlantInterface[] );
                observer.complete();
            } );
        } );
    }

    // Find plants matching requested name
    public getOne = ( name: string ) => {
        return Observable.create( observer => {
            this.DB.find( { name: name }, ( err: Error, docs: PlantInterface[] ) => {
                if ( err ) observer.error( err );
                docs.forEach( ( doc ) => {
                    debug( "controller getAll: " + JSON.stringify( doc ) );
                    observer.next( doc as PlantInterface );
                } );
                observer.complete();
            } );
        } );
    }
}

export default PlantController;