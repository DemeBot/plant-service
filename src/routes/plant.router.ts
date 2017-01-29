import { Router } from "express";

import PlantService from "./../services/plant.service";

export class PlantRouter {

    router: Router;
    private plantService: PlantService;

    /**
     * Initialize the router
     */
    constructor( injPlantService?: PlantService ) {

        if ( injPlantService ) this.plantService = injPlantService;
        else this.plantService = new PlantService();

        this.router = Router();
        this.init();

    }

    init() {
        /**
         * @api {get} /api/v1/plants Get all plants
         * @apiName root
         * @apiGroup Plant
         *
         * @apiSuccess {Plant[]} plants An array of plants.
         */
        this.router.get( "/", this.plantService.getAll );

        /**
         * @api {get} /api/v1/plants/:name Get one plant by name
         * @apiName Get plant by name
         * @apiGroup Plant
         *
         * @apiSampleRequest /api/v1/plants/lettuce
         * @apiSuccess {Plant} plant A plant.
         */
        this.router.get( "/:name", this.plantService.getOne );
    }
}

// Create router and export its Express.Router
const plantRoutes = new PlantRouter();

export default plantRoutes.router;