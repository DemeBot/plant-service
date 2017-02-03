import { Router } from "express";

import PlantService from "./../services/plant.service";

export class PlantRouter {

    router: Router;
    private plantService: PlantService;

    /**
     * Initialize the router
     */
    constructor( plantService?: PlantService ) {

        this.plantService = typeof plantService !== "undefined" ? plantService : new PlantService();

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
        /**
         * @api {put} /api/v1/plants Add a new plant
         * @apiName Add a new plant
         * @apiGroup Plant
         *
         * @apiParam (Plant) {string} name Name of the plant
         * @apiParam (Plant) {number} plantingDepth Depth to plant the seed
         * @apiParam (Plant) {number} daysToGerminate Number of days for the seed to germinate
         * @apiParam (Plant) {number} avgMaxHeight Average max height of the plant
         * @apiParam (Plant) {number} avgMaxDiameter Average max diameter of the plant
         * @apiParam (Plant) {number} [maxPlantingDepth] Max depth to plant the seed
         * @apiParam (Plant) {number} [minPlantingDepth] Min depth to plant the seed
         * @apiSampleRequest /api/v1/plants
         * @apiSuccess {Plant} plant The plant that you added.
         */
        this.router.put( "/", this.plantService.putOne );
    }
}

// Create router and export its Express.Router

export default PlantRouter;