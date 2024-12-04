import AuthController from '@controllers/auth.controller';
import asyncMiddleware from '@middleware/async';
import { userRequired } from '@middleware/authenticate';
// import { userNotRequired } from '@middleware/authenticate';
import validateReq from '@middleware/validateReq';
import { signinSchema, tokenSchema } from '@shared/validation';
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

export default authRouter;
