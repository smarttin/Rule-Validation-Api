import express from 'express';
import router from './route.js';

const app = express();

//ensures that every incoming request is a valid json
app.use(express.json());

app.use(router);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'Fail';
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: 'Invalid JSON payload passed.',
    status: 'error',
    data: null,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(3000, console.log('server is running on localhost:3000'));
