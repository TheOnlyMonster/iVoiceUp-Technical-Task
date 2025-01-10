import { Router } from 'express';
import { validateRequest } from '../middlewares/validationHandler';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { addEmployeeValidator, editEmployeeValidator, getEmployeeValidator, viewEmployeesValidator } from '../validators/employeeValidators';
import { addEmployee, editEmployee, getEmployeeById, viewEmployees } from '../controllers/employeeController';
const router = Router();

router.post('/add', AuthMiddleware, addEmployeeValidator, validateRequest, addEmployee);

router.put('/edit', AuthMiddleware, editEmployeeValidator, validateRequest, editEmployee)

router.get('/get', AuthMiddleware, getEmployeeValidator, validateRequest, getEmployeeById);

router.get('/view', AuthMiddleware, viewEmployeesValidator, validateRequest, viewEmployees);

export default router;
