import { Employee } from '../models/Employee';
import { TokenService } from './tokenService';
import { comparePassword } from '../utils/passwordUtils';
import { HREmployee } from '../models/HREmployee';
import { IHREmployee } from '../interfaces/IHREmployee';
import { CustomError } from '../errors/CustomError';

export class AuthService {
  static async signIn(email: string, password: string): Promise<string> {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      throw new CustomError('Invalid email or password.', 401);
    }

    if (!(employee instanceof HREmployee)) {
      throw new CustomError('Invalid email or password.', 401);
    }

    const hrEmployee = employee as IHREmployee;

    const isPasswordValid = await comparePassword(password, hrEmployee.password);
    if (!isPasswordValid) {
      throw new CustomError('Invalid email or password.', 401);
    }
    const id = hrEmployee._id.toString();
    const token = TokenService.generateAccessToken(id);

    return token;
  }
}