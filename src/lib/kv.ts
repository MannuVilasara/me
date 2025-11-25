import { createClient } from 'redis';

// Create Redis client using REDIS_URL from environment
const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

// Handle connection errors
redis.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// Connect to Redis (only if not already connected)
if (!redis.isOpen) {
  redis.connect().catch(console.error);
}

// Export Redis-compatible interface
export const kv = {
  async lrange(key: string, start: number, end: number): Promise<string[]> {
    try {
      return await redis.lRange(key, start, end);
    } catch (error) {
      console.error('Redis LRANGE error:', error);
      return [];
    }
  },

  async rpush(key: string, ...values: string[]): Promise<number> {
    try {
      return await redis.rPush(key, values);
    } catch (error) {
      console.error('Redis RPUSH error:', error);
      throw error;
    }
  },

  async del(key: string): Promise<number> {
    try {
      return await redis.del(key);
    } catch (error) {
      console.error('Redis DEL error:', error);
      throw error;
    }
  },

  async exists(key: string): Promise<number> {
    try {
      return await redis.exists(key);
    } catch (error) {
      console.error('Redis EXISTS error:', error);
      return 0;
    }
  },

  async quit(): Promise<void> {
    try {
      await redis.quit();
    } catch (error) {
      console.error('Redis QUIT error:', error);
    }
  },
};
