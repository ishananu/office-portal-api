import authController from '@controllers/auth.controller';
import { userNotRequired } from '@middleware/authenticate';
import validateReq from '@middleware/validateReq';
import { signinSchema } from '@shared/validation';
import { Router } from 'express';

const authRouter = Router();

authRouter.post(
  '/signin',
  userNotRequired,
  validateReq(signinSchema),
  authController.loginUser
);

export default authRouter;
