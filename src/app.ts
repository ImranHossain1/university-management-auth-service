import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.route';
// import ApiError from './errors/ApiError'
const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application route
app.use('/api/v1/users', UserRoutes);

// //testing
app.get('/', async () => {
  // Promise.reject(new Error('Unhandled Promise Rejection'))
  throw new Error('Testing Error Logger');
});

//global error handling
app.use(globalErrorHandler);
export default app;
