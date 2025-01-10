import { Router } from 'express';
import { validateRequest } from '../middlewares/validationHandler';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { addEmployeeValidator, editEmployeeValidator } from '../validators/employeeValidators';
import { addEmployee, editEmployee } from '../controllers/employeeController';
const router = Router();

router.post('/add', AuthMiddleware, addEmployeeValidator, validateRequest, addEmployee);

router.put('/edit', AuthMiddleware, editEmployeeValidator, validateRequest, editEmployee)

export default router;
