import express, { Application } from 'express';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import unvalidRouteHandler from './middleware/unvalidRouteHandler';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: (process.env.CORS_ORIGINS && process.env.CORS_ORIGINS.split(',')) || '*',
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', routes.healthRouter);
app.use('/word', routes.wordRouter);

// Error handler
app.use(errorHandler);
app.use(unvalidRouteHandler);

export default app;
