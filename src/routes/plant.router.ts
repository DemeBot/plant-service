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
         * @apiDefine PlantRequest
         *
         * @apiParam (Request Parameters) {string} name Name of the plant
         * @apiParam (Request Parameters) {number} depth Depth to plant the seed
         * @apiParam (Request Parameters) {number} days_to_germinate Number of days for the seed to germinate
         * @apiParam (Request Parameters) {number} height Typical max height of the plant
         * @apiParam (Request Parameters) {number} width Typical max width of the plant
         * @apiParam (Request Parameters) {string} description Description of the plant
         */

        /**
         * @apiDefine PlantResponse
         *
         * @apiSuccess (Successful Response) {number} plant.id Database id of the plant
         * @apiSuccess (Successful Response) {string} plant.name Name of the plant
         * @apiSuccess (Successful Response) {number} plant.depth Depth to plant the seed
         * @apiSuccess (Successful Response) {number} plant.days_to_germinate Number of days for the seed to germinate
         * @apiSuccess (Successful Response) {number} plant.height Typical max height of the plant
         * @apiSuccess (Successful Response) {number} plant.width Typical max width of the plant
         * @apiSuccess (Successful Response) {number} plant.diameter Typical max diameter of the plant
         * @apiSuccess (Successful Response) {string} plant.description Description of the plant
         */

        /**
         * @api {get} /api Get all plants
         * @apiName root
         * @apiGroup Plant
         *
         * @apiParam (Request Parameters) {number} [id] Database id of the plant
         * @apiParam (Request Parameters) {string} [name] Name of the plant
         * @apiParam (Request Parameters) {boolean} [get_deleted=false] Name of the plant
         * @apiSuccess (Successful Response) {[plant]} plants An array of plants. Each element in the array has the following keys:
         * @apiUse PlantResponse
         */
        this.router.get( "/", this.plantService.get );

        /**
         * @api {post} /api Add a new plant
         * @apiName Add a new plant
         * @apiGroup Plant
         *
         * @apiUse PlantRequest
         * @apiUse PlantResponse
         */
        this.router.post( "/", this.plantService.post );

        /**
         * @api {delete} /api Delete a plant by id
         * @apiName Delete a  plant
         * @apiGroup Plant
         *
         * @apiParam (Request Parameters) {number} id Database id of the plant
         */
        this.router.delete( "/", this.plantService.delete );
    }
}

// Create router and export its Express.Router

export default PlantRouter;