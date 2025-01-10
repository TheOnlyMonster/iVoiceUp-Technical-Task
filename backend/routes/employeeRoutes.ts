import { Router } from 'express';
import { validateRequest } from '../middlewares/validationHandler';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { addEmployeeValidator, editEmployeeValidator, getEmployeeValidator } from '../validators/employeeValidators';
import { addEmployee, editEmployee, getEmployeeById } from '../controllers/employeeController';
const router = Router();

router.post('/add', AuthMiddleware, addEmployeeValidator, validateRequest, addEmployee);

router.put('/edit', AuthMiddleware, editEmployeeValidator, validateRequest, editEmployee)

router.get('/get', AuthMiddleware, getEmployeeValidator, getEmployeeById);

export default router;
