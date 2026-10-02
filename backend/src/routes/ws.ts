import { FastifyInstance } from 'fastify';
import redis from '../services/cache.service';
import { Redis } from 'ioredis';

// We need a separate redis connection for subscribing
const redisSubscriber = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export default async function websocketRoutes(fastify: FastifyInstance) {
  fastify.get('/dispatch', { websocket: true }, (socket, req) => {
    fastify.log.info('WebSocket client connected for dispatch updates');
    
    // Subscribe to dispatch channels
    redisSubscriber.subscribe('dispatch:new-complaint', (err, count) => {
      if (err) {
        fastify.log.error('Failed to subscribe: %s', err.message);
      }
    });

    redisSubscriber.subscribe('stealth-purge', (err, count) => {
      if (err) {
        fastify.log.error('Failed to subscribe: %s', err.message);
      }
    });

    redisSubscriber.on('message', (channel, message) => {
      if (channel === 'dispatch:new-complaint') {
        // Broadcast new complaint info to connected dispatch officers
        socket.send(JSON.stringify({ type: 'NEW_COMPLAINT', data: JSON.parse(message) }));
      }
      
      if (channel === 'stealth-purge') {
        // Check if the current connected user matches the stealth purge
        // In reality, req would have authenticated user info
        const parsed = JSON.parse(message);
        // if (parsed.userId === req.user.id) { socket.close(); }
        // For demonstration, broadcast purge alert
        socket.send(JSON.stringify({ type: 'STEALTH_PURGE', data: parsed }));
      }
    });

    socket.on('message', message => {
      // Handle incoming WS messages if needed
      fastify.log.info('Received WS message: ' + message);
    });

    socket.on('close', () => {
      fastify.log.info('WebSocket client disconnected');
      // redisSubscriber.unsubscribe(); // Note: careful if multiple sockets share the same redis instance. 
      // Best practice is to use one Redis sub per WS connection, or a central emitter.
    });
  });
}
