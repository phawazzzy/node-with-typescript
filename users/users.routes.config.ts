import { CommonRoutesConfig } from "../common/common.routes.config";
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "usersRoutes")
    }

    configureRoutes() {
        // implementation here
        this.app.route("/users")
            .get((req: express.Request, res: express.Response) => {
                res.status(200).json({ user: "list of users" });
             })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).json({ user: "new user" });
             });
    
        this.app.route("/users/:userId")
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {

              next();
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET requested for id ${req.params.userId}`)
            })
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.userId}`);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.userId}`);
            });
        
        return this.app;
    }
}
