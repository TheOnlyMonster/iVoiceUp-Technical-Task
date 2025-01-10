import { Employee } from '../models/Employee';
import { TokenService } from './tokenService';
import { comparePassword } from '../utils/passwordUtils';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { HREmployee } from '../models/HREmployee';
import { IHREmployee } from '../interfaces/IHREmployee';

export class AuthService {
  static async signIn(email: string, password: string): Promise<string> {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    if (!(employee instanceof HREmployee)) {
      throw new UnauthorizedError('Not authorized.');
    }

    const hrEmployee = employee as IHREmployee;

    const isPasswordValid = await comparePassword(password, hrEmployee.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password.');
    }
    const id = hrEmployee._id.toString();
    const token = TokenService.generateAccessToken(id);

    return token;
  }
}