import { Router } from 'express';
import { addAttendance, getAttendanceByEmployeeId } from '../controllers/attendanceController';
import { validateRequest } from '../middlewares/validationHandler';
import { addAttendanceValidator } from '../validators/addAttendanceValidator';
import { getAttendanceValidator } from '../validators/getAttendanceValidator';
import { AuthMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/add', AuthMiddleware, addAttendanceValidator, validateRequest, addAttendance);

router.get('/get/:employeeId', AuthMiddleware, getAttendanceValidator, validateRequest, getAttendanceByEmployeeId);

export default router;