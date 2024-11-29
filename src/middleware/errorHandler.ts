import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import CustomError from '../helpers/CustomError';

const errorHandler: ErrorRequestHandler = (err: CustomError, _: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
};

export default errorHandler;
