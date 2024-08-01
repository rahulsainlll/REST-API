import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import  deserializeUser from "./middleware/deserializeUser";

const app = express();
// middleware
app.use(express.json());
app.use(deserializeUser);

const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port} 🏃🏃🏃🏃`);

  await connect();

  routes(app);
});
 