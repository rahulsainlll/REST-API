import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";
import validateResources from "./middleware/validateResources";

function routes(app: Express) {
  app.get("/healthCheck", (req: Request, res: Response) => res.sendStatus(200));

  app.get("/api/users", validateResources(createUserSchema), createUserHandler);
}

export default routes;

