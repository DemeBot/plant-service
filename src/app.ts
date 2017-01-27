import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import PlantRouter from './routes/plant.router';

var version = 1;

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use( logger( 'dev' ) );
    this.express.use( bodyParser.json() );
    this.express.use( bodyParser.urlencoded( { extended: false } ) );
    this.express.use( ( req, res, next ) => {
      res.header( "Access-Control-Allow-Origin", "*" );
      res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
      next();
    } );
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use( '/doc/v' + version, express.static( __dirname + '/apidoc' ) );
    this.express.use( '/api/v' + version +'/plants', PlantRouter );
  }

}

export default new App().express;