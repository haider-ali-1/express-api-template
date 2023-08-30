import express from 'express';

import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { errorHandlerMiddleware } from './middleware/global-error-handler.js';
import { notFoundMiddleware } from './middleware/not-found.js';

const app = express();
app.set('trust proxy', 1);
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60,
  message: 'too many requests try again after some time',
});
app.use(apiLimiter);
app.use(helmet());
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

app.use(express.static('./public'));

// routes
// app.use('/api/v1/auth', authRoutes);

app.all('*', notFoundMiddleware);

app.use(errorHandlerMiddleware);

export { app };
