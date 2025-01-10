import { Request, Response, NextFunction } from "express";
import { TokenService } from "../services/tokenService";
import { Employee } from "../models/Employee";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { HREmployee } from "../models/HREmployee";
interface AuthenticatedRequest extends Request {
  user?: InstanceType<typeof Employee>;
}

export const AuthMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new UnauthorizedError("Unauthorized access - no token provided");
    }

    const decoded = TokenService.verifyAccessToken(token);

    const user = await Employee.findById(decoded.userId);

    if (!user) {
      throw new UnauthorizedError("Unauthorized access - invalid token");
    }

    if (!(user instanceof HREmployee)) {
      throw new UnauthorizedError("Unauthorized access - not an HR employee");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
