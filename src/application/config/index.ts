import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import { Config } from '@/domain/interfaces/config.interface';
import pkgJson from '../../../package.json';

export class ConfigImpl implements Config {
  app = {
    name: pkgJson.name,
    port: Number(process.env.PORT),
    host: process.env.HOST as string,
    stripPrefix: `/${pkgJson.name.toLowerCase().replace(' ', '-')}`,
    version: pkgJson.version,
  };
  redis = {
    enabled: process.env.REDIS_ENABLED === 'true',
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST as string,
    defaultExpire: Number(process.env.REDIS_DEFAULT_EXPIRE),
  };
  mongodb = {
    uri: process.env.MONGODB_URI as string,
    databaseName: process.env.MONGODB_DB_NAME as string,
  };
}