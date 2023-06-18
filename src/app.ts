import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const app: Application = express();

// configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//entry point
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.get('/api/v1', async (req: Request, res: Response, next: NextFunction) => {
  res.send('Welcome to digital cow hut');
});

//routes

// middlewares

// not found route
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `${req.originalUrl} not found`,
    errorMessages: [
      {
        path: req.originalUrl,
        message: `${req.originalUrl} not found`,
      },
    ],
  });
});

export default app;
