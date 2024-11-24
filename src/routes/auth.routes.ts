import AuthController from '@controllers/auth.controller';
import asyncMiddleware from '@middleware/async';
// import { userNotRequired } from '@middleware/authenticate';
import validateReq from '@middleware/validateReq';
import { signinSchema } from '@shared/validation';
import { Router } from 'express';

const authRouter = Router();

authRouter.post(
  '/login',
  validateReq(signinSchema),
  asyncMiddleware(AuthController.loginUser)
);

export default authRouter;
