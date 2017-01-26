import { Router, Request, Response, NextFunction } from 'express';

export class PlantRouter {
    router: Router

    /**
     * Initialize the router
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all plants
     */
    public getAll( req: Request, res: Response, next: NextFunction) {
        res.send([]);
    }

    /**
     * attach handlers to endpoints
     */
    init() {
        this.router.get( '/', this.getAll );
    }
}

const plantRouter = new PlantRouter();
plantRouter.init();

export default plantRouter.router;