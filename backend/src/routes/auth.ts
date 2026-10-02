import { FastifyInstance } from 'fastify';
import { CacheService } from '../services/cache.service';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/stealth-purge', async (request, reply) => {
    // In a real scenario, the userId would come from the authenticated session
    // For this example, we take it from the body, but it could be triggered
    // without full auth (e.g. panic button) relying on a device cookie/token.
    const { userId } = request.body as { userId?: string };

    if (!userId) {
      return reply.status(400).send({ error: 'User ID required' });
    }

    try {
      // Instantly revoke active sessions and purge temp tokens
      await CacheService.stealthPurgeUser(userId);
      
      // Return 200 without exposing sensitive info
      return reply.send({ success: true, message: 'Sessions purged successfully.' });
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}
