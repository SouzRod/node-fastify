interface AppConfig {
  name: string;
  port: number;
  host: string;
  version: string;
  stripPrefix: string;
}

interface RedisConfig {
  enabled: boolean;
  port: number;
  host: string;
  defaultExpire: number;
}

interface MongoDBConfig {
  uri: string;
  databaseName: string;
}


export interface Config {
  app: AppConfig;
  redis: RedisConfig;
  mongodb: MongoDBConfig;
}