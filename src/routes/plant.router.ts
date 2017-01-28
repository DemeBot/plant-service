import { Router } from "express";

import PlantService from "./../services/plant.service";

export class PlantRouter {

    router: Router;

    /**
     * Initialize the router
     */
    constructor() {

        this.router = Router();
        
        /**
         * @api {get} /api/v1/plants Get all plants
         * @apiName root
         * @apiGroup Plant
         *
         * @apiSuccess {Plant[]} plants An array of plants.
         */
        this.router.get( "/", PlantService.getAll );

        /**
         * @api {get} /api/v1/plants/:name Get one plant by name
         * @apiName Get plant by name
         * @apiGroup Plant
         *
         * @apiSampleRequest /api/v1/plants/lettuce
         * @apiSuccess {Plant} plant A plant.
         */
        this.router.get( "/:name", PlantService.getOne );

    }
}

// Create router and export its Express.Router
const plantRoutes = new PlantRouter();

export default plantRoutes.router;