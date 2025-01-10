import { sign, verify } from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig";

export class TokenService {
  static generateAccessToken(id: string): string {
    const payload = {
      userId: id,
    };

    return sign(payload, jwtConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRATION,
    });
  }

  static verifyAccessToken(token: string): any {
    return verify(token, jwtConfig.ACCESS_TOKEN_SECRET);
  }

  static verifyRefreshToken(token: string): any {
    return verify(token, jwtConfig.REFRESH_TOKEN_SECRET);
  }
}
