import Redis from 'ioredis';

import { ConfigImpl } from '@/application/config';
import { Config } from '@/domain/interfaces';

export class RedisExternal {
  private client: Redis;
  private config: Config = new ConfigImpl();

  constructor() {
    this.client = this.config.redis.enabled ? new Redis({
      port: this.config.redis.port,
      host: this.config.redis.host,
    }) : { get: async () => null, set: async () => {} } as unknown as Redis;
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, expire: number = this.config.redis.defaultExpire): Promise<void> {
    await this.client.set(key, value, 'EX', expire);
  }
}