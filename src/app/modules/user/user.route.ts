import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/middleware';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

// create faculty
/* router.post(
  '/create-faculty',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

// create admin
router.post(
  '/create-admin',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
); */

export const UserRoutes = router;
