import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// requiring routes
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import menuRoute from './routes/menus.js';
import orderRoute from './routes/orders.js';
import reviewRoute from './routes/reviews.js';

// start express app
const app = express();

// global middlewares
// implement CORS
app.use(cors());

// Access-Control-Allow-Origin
app.options('*', cors());

// set security HTTP headers
app.use(helmet());

// development logging
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

// limit request from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in 15 minutes!',
});

app.use('/api', limiter);

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/menus', menuRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/reviews', reviewRoute);

export default app;
