import { Request, Response, NextFunction } from 'express';

const unvalidRouteHandler = (_: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: 'Route not found' });
};

export default unvalidRouteHandler;
