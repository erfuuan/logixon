import http from 'http'
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import cors from 'cors';
import logger from 'morgan'
import compression from 'compression'
import helmet from "helmet"
import chalk from 'chalk'
import uncaughtHandler from './utils/error.js';
import mainRouter from "./router/index.js"
import { connect } from "./connection/database.js"
import Middleware from "./middlewares/index.js"

dotenv.config();
process.on('uncaughtException', uncaughtHandler.uncaughtExceptionHandler);
process.on('unhandledRejection', uncaughtHandler.unhandledRejectionHandler);

connect()
const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(methodOverride());
app.use(cors());
app.use(helmet());
app.use(compression())
app.use(logger('dev'))

app.use((req, res, next) => {
  res.setHeader('charset', 'utf-8')
  return next()
})


app.use("/api/v1/",Middleware.apiAuth, mainRouter)
app.use(Middleware.errHandler);
function bootstrap() {
  const server = http.createServer(app)
  server.listen(3000, () => {
    console.log(chalk.greenBright.underline(`✔  [success] eventory-manager-service Started listening on port : ${3000} 💥`))
  });
}

bootstrap()

export default app