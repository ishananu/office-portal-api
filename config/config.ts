import * as dotenv from 'dotenv';
dotenv.config();
const { env } = process;

const config = {
  name: env.APP_NAME,
  port: env.APP_PORT,
  secretToken: env.ACCESS_TOKEN_SECRET,
  refreshToken: env.REFRESH_TOKEN_SECRET,
  databases: {
    mysql: {
      user: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      host: env.DB_HOST,
      port: env.DB_PORT,
      database: env.DB_DATABASE,
      url: env.DB_URL
    }
  }
};

export default config;
