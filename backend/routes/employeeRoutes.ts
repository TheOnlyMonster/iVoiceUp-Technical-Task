import { Router } from 'express';
import { validateRequest } from '../middlewares/validationHandler';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { addEmployeeValidator } from '../validators/employeeValidators';
import { addEmployee } from '../controllers/employeeController';
const router = Router();

router.post('/add', AuthMiddleware, addEmployeeValidator, validateRequest, addEmployee);

export default router;
