import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";
import validateResources from "./middleware/validateResources";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  app.get("/healthCheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post(
    "/api/users",
    validateResources(createUserSchema),
    createUserHandler
  );

  app.post(
    "/api/sessions",
    validateResources(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);
}

export default routes;
