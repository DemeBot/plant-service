import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as interceptor from "express-interceptor";

import PlantRouter from "./routes/plant.router";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public plantRouter: PlantRouter;

  // Run configuration methods on the Express instance.
  constructor( plantRouter?: PlantRouter ) {
    this.express = express();

    // instantiate an instance of the plant router if one is not injected
    this.plantRouter = ( typeof plantRouter !== "undefined" ) ? plantRouter : new PlantRouter();

    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use( logger( "dev" ) );
    this.express.use( bodyParser.json() );
    this.express.use( bodyParser.urlencoded( { extended: false } ) );
    this.express.use( ( req, res, next ) => {
      res.header( "Access-Control-Allow-Origin", "*" );
      res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
      next();
    } );
    this.express.use( "/doc", this.replaceTemplateURL );
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use( "/doc", express.static( __dirname + "/apidoc" ) );
    this.express.use( "/api", this.plantRouter.router );
  }

  private replaceTemplateURL = interceptor( ( request: express.Request, response: express.Response ) => {
    return {
      isInterceptable: () => {
        console.log( response.get( "Content-Type" ) );
        return /application\/javascript/.test( response.get("Content-Type") );
      },
      intercept: ( body, send ) => {
        new Promise( ( resolve, reject ) => {
          let sourceUrl = ( request.headers[ "x-forwarded-url" ] || "localhost:8080" );
          console.log( "SourceURL:" + sourceUrl );
          resolve( sourceUrl.replace( "/doc" + "/api_data.js", "" ) );
        } )
        .then( ( url: string ) => {
          send( body.split( "<base-doc-url>" ).join( url ) );
        } );
      }
    };
  } );

}

export default App;