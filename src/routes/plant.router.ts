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
         * @apiSuccess (Plants) {Plant[]} plants An array of plants. Each element in the array has the following keys:
         * @apiSuccess (Plants) {string} plant.name Name of the plant
         * @apiSuccess (Plants) {number} plant.plantingDepth Depth to plant the seed
         * @apiSuccess (Plants) {number} plant.daysToGerminate Number of days for the seed to germinate
         * @apiSuccess (Plants) {number} plant.avgMaxHeight Average max height of the plant
         * @apiSuccess (Plants) {number} plant.avgMaxDiameter Average max diameter of the plant
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
         * @apiParam (Request Parameters) {string} name Name of the plant
         * @apiParam (Request Parameters) {number} plantingDepth Depth to plant the seed
         * @apiParam (Request Parameters) {number} daysToGerminate Number of days for the seed to germinate
         * @apiParam (Request Parameters) {number} avgMaxHeight Average max height of the plant
         * @apiParam (Request Parameters) {number} avgMaxDiameter Average max diameter of the plant
         * @apiParam (Request Parameters) {number} [maxPlantingDepth] Max depth to plant the seed
         * @apiParam (Request Parameters) {number} [minPlantingDepth] Min depth to plant the seed
         * @apiSampleRequest /api/v1/plants
         * @apiSuccess (Successful Response) {string} name Name of the plant
         * @apiSuccess (Successful Response) {number} plantingDepth Depth to plant the seed
         * @apiSuccess (Successful Response) {number} daysToGerminate Number of days for the seed to germinate
         * @apiSuccess (Successful Response) {number} avgMaxHeight Average max height of the plant
         * @apiSuccess (Successful Response) {number} avgMaxDiameter Average max diameter of the plant
         * @apiSuccess (Successful Response) {string} _id Database ID
         */
        this.router.post( "/", this.plantService.postOne );
    }
}

// Create router and export its Express.Router

export default PlantRouter;