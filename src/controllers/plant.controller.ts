const debug = require("debug");

import  * as mysql from "mysql";
import MySQLConnector from "./../connector/mysql.connector";

import PlantInterface from "./../models/plant.interface";

export class PlantController {

    private DB: mysql.IPool;

    constructor( DB?: mysql.IPool ) {
        // instantiate DB by first checking for injected DB and creating one if one wasn't injected
        this.DB = ( DB || new MySQLConnector().pool );
    }

    // Call plant database for all plants
    public get( id?: number, name?: string, getDeleted: boolean = false ): Promise<PlantInterface[]> {

        // Build MySQL query
        let query: string = "SELECT * FROM PLANT_TYPES";
        let queryParams: string[] = [];

        if ( !getDeleted ) {
            queryParams.push( "`ended_at` IS NULL" );
        }

        if ( id !== undefined && String( id ) !== "" ) {
            queryParams.push( "`id` = " + mysql.escape( id ) );
        }

        if ( name !== undefined && name !== "" ) {
            queryParams.push( "`name` = " + mysql.escape( name ) );
        }

        if ( queryParams.length > 0 ) {
            query += " WHERE " + queryParams.join( " AND " );
        }

        // Return Promise
        return new Promise( ( resolve, reject ) => {

            console.log( query );
            // Run MySQL Query
            this.DB.query( query, ( error: Error, results: PlantInterface[] ) => {

                // If there is an error, reject the promise with the error.
                if ( error ) {
                    reject( error );
                }

                // Otherwise resolve the promise with the MySQL results
                else {
                    debug( JSON.stringify( results ) );
                    resolve( results );
                }
            } );
        } );
    }

    // adding new plants to the database
    public post (
         _name: string,
         _depth: number,
         _days_to_harvest: number,
         _height: number,
         _width: number,
         _description: string
         ): Promise<PlantInterface> {

        let doc = {
            name: _name,
            depth: _days_to_harvest,
            days_to_harvest: _days_to_harvest,
            height: _height,
            width: _width,
            description: _description
        };

        // Build MySQL query
        let query: string = "INSERT INTO `PLANT_TYPES` SET ?";

        return new Promise( ( resolve, reject ) => {
            console.log( query );
            this.DB.query( query, doc, ( error: Error, results ) => {
                if ( error ) reject( error );
                else {
                    console.log( "Inserted ID: " + results.insertId );
                    this.get( results.insertId )
                    .then( ( result: PlantInterface[] ) => {
                        resolve( result[0] );
                    } );
                }
            } );
        } );
    }

    public delete (
        _id: number
    ): Promise<PlantInterface[]> {
        // Build MySQL query
        let query: string = "UPDATE `PLANT_TYPES` SET `ended_at` = NOW()  WHERE `id` = " + mysql.escape( _id );

        return new Promise( ( resolve, reject ) => {
            console.log( query );

            this.get( _id )
            .then( ( results: PlantInterface[] ) => {
                if ( results.length > 0 )
                this.DB.query( query, ( error, result ) => {
                    if ( error ) reject( error );
                    resolve( results );
                } );
                else resolve( results );
            } )
            .catch( ( error ) => {
                reject( error );
            } );
        } );
    }
}

export default PlantController;