import express from 'express';
import morgan from 'morgan';

// requiring routes
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';

const app = express();

// development logging
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);

export default app;
