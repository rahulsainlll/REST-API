import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routess";

const app = express();
app.use(express.json());
const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port} 🏃🏃🏃🏃`);

  await connect();

  routes(app)
});

