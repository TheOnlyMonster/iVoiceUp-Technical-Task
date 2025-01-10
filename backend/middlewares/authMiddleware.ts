import { Request, Response, NextFunction } from "express";
import { TokenService } from "../services/tokenService";
import { Employee } from "../models/Employee";
import { HREmployee } from "../models/HREmployee";
import { CustomError } from "../errors/CustomError";
interface AuthenticatedRequest extends Request {
  user?: InstanceType<typeof Employee>;
}

export const AuthMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new CustomError("Unauthorized access - missing token", 401);
    }

    const decoded = TokenService.verifyAccessToken(token);

    const user = await Employee.findById(decoded.userId);

    if (!user) {
      throw new CustomError("Unauthorized access - user not found", 401);
    }

    if (!(user instanceof HREmployee)) {
      throw new CustomError("Unauthorized access - HR employee required", 401);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
