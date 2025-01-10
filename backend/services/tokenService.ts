import { sign, verify, JwtPayload } from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig";

interface AccessTokenPayload {
  userId: string;
}

export class TokenService {
  static generateAccessToken(id: string): string {
    const payload: AccessTokenPayload = {
      userId: id,
    };

    return sign(payload, jwtConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRATION,
    });
  }

  static verifyAccessToken(token: string): AccessTokenPayload | JwtPayload {
    return verify(token, jwtConfig.ACCESS_TOKEN_SECRET) as AccessTokenPayload | JwtPayload;
  }

  static verifyRefreshToken(token: string): JwtPayload {
    return verify(token, jwtConfig.REFRESH_TOKEN_SECRET) as JwtPayload;
  }
}
