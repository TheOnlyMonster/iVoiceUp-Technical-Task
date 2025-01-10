import * as dotenv from 'dotenv';
dotenv.config({ path: './.env.dev' });

const jwtConfig = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'defaultAccessTokenSecret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'defaultRefreshTokenSecret',
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION || '1h',
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
};

export default jwtConfig;