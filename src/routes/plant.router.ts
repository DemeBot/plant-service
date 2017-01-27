import { Router, Request, Response, NextFunction } from 'express';

import  * as NeDB from 'nedb';

var DB:NeDB = new NeDB({ filename: 'plants.db', autoload: true });

export class PlantRouter {
    router: Router;

    /**
     * Initialize the router
     */
    constructor() {

        this.router = Router();

        this.init();

    }

    /**
     * @api {get} /api/v1/plants Get all plants
     * @apiName root
     * @apiGroup Plant
     *
     * @apiSuccess {Plant[]} plants An array of plants.
     */
    public getAll( req: Request, res: Response, next: NextFunction ) {

        var all = DB.find( {  }, ( err, docs ) => {
            res.send(
                {
                    plants : docs
                }
            );
        } );
    }

    /**
     * @api {get} /api/v1/plants/:name Get one plant by name
     * @apiName Get plant by name
     * @apiGroup Plant
     *
     * @apiSampleRequest /api/v1/plants/lettuce
     * @apiSuccess {Plant} plant A plant.
     */
    public getOne( req: Request, res: Response, next: NextFunction ) {

        let query = req.params.name;
        let plant = DB.findOne( { name: query }, ( err, doc ) => {
            res.send( { 
                plant: doc
             } );
        } );

    }

    /**
     * attach handlers to endpoints
     */
    init() {

        this.router.get( '/', this.getAll );
        this.router.get( '/:name', this.getOne );

    }
}


// Create router and export its Express.Router
const plantRoutes = new PlantRouter();
plantRoutes.init();

export default plantRoutes.router;