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
         * @apiSuccess (Plant) {string} plant.name Name of the plant
         * @apiSuccess (Plant) {number} plant.plantingDepth Depth to plant the seed
         * @apiSuccess (Plant) {number} plant.daysToGerminate Number of days for the seed to germinate
         * @apiSuccess (Plant) {number} plant.avgMaxHeight Average max height of the plant
         * @apiSuccess (Plant) {number} plant.avgMaxDiameter Average max diameter of the plant
         */
        this.router.get( "/", this.plantService.getAll );

        /**
         * @api {get} /api/v1/plants/:name Get one plant by name
         * @apiName Get plant by name
         * @apiGroup Plant
         *
         * @apiSuccess (Plant) {string} name Name of the plant
         * @apiSuccess (Plant) {number} plantingDepth Depth to plant the seed
         * @apiSuccess (Plant) {number} daysToGerminate Number of days for the seed to germinate
         * @apiSuccess (Plant) {number} avgMaxHeight Average max height of the plant
         * @apiSuccess (Plant) {number} avgMaxDiameter Average max diameter of the plant
         *
         * @apiSampleRequest /api/v1/plants/lettuce
         */
        this.router.get( "/:name", this.plantService.getOne );
        /**
         * @api {post} /api/v1/plants Add a new plant
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
        this.router.post( "/", this.plantService.postOne );
    }
}

// Create router and export its Express.Router

export default PlantRouter;