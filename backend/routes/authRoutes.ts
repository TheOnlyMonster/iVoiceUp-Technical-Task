import { Router } from 'express';
import { signIn } from '../controllers/authController';
import { signInValidator } from '../validators/authValidators';
import { validateRequest } from '../middlewares/validationHandler';

const router = Router();

router.post('/signin', signInValidator, validateRequest, signIn);

export default router;
