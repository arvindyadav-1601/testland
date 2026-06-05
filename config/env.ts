// config/env.ts
import 'dotenv/config';

export const env = {
  url:      process.env.APP_URL      ?? '',
  username: process.env.APP_USERNAME ?? '',
  password: process.env.APP_PASSWORD ?? '',
};