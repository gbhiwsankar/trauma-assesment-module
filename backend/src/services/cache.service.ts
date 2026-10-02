import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export class CacheService {
  /**
   * Sets an active session for a user.
   */
  static async setSession(userId: string, sessionToken: string, expirySeconds: number = 3600) {
    await redis.setex(`session:${userId}:${sessionToken}`, expirySeconds, 'ACTIVE');
  }

  /**
   * Emergency Panic / Stealth Wipe:
   * Instantly purges all sessions and temporary cache lines for a user.
   */
  static async stealthPurgeUser(userId: string) {
    // Note: In production, using SCAN is safer than KEYS to avoid blocking Redis.
    const keys = await redis.keys(`session:${userId}:*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    
    // Purge any temporary tokens or drafts
    const draftKeys = await redis.keys(`draft:${userId}:*`);
    if (draftKeys.length > 0) {
      await redis.del(...draftKeys);
    }
    
    // Optionally publish a message to forcefully disconnect any active WebSocket connections
    await redis.publish('stealth-purge', JSON.stringify({ userId }));
  }
}

export default redis;
