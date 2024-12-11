import AuthController from '@controllers/auth.controller';
import employeeController from '@controllers/employee.controller';
import asyncMiddleware from '@middleware/async';
import { userRequired } from '@middleware/authenticate';
// import { userNotRequired } from '@middleware/authenticate';
import validateReq from '@middleware/validateReq';
import {
  saveEmployeeSchma,
  signinSchema,
  tokenSchema
} from '@shared/validation';
import { Router } from 'express';

const authRouter = Router();

authRouter.post(
  '/login',
  validateReq(signinSchema),
  asyncMiddleware(AuthController.loginUser)
);

authRouter.post(
  '/refresh',
  validateReq(tokenSchema),
  asyncMiddleware(AuthController.refreshToken)
);

authRouter.post(
  '/logout',
  userRequired,
  asyncMiddleware(AuthController.logOutUser)
);

authRouter.post(
  '/signup',
  validateReq(saveEmployeeSchma),
  employeeController.createEmployee
);
export default authRouter;
