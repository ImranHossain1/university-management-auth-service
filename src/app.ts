import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
/* import {
  generateFacultyId,
  generateStudentId,
} from './app/modules/user/user.utils'; */
const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);
//global error handling
app.use(globalErrorHandler);

//handle notfound route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});
/* const academicSemester = {
  code: '01',
  year: '2025',
};

const testId = async () => {
  const testId = await generateFacultyId();
  console.log(testId);
};
testId(); */
export default app;
