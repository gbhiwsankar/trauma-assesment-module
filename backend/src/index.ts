import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import authRoutes from './routes/auth';
import complaintRoutes from './routes/complaints';
import websocketRoutes from './routes/ws';

const fastify = Fastify({
  logger: true
});

async function start() {
  try {
    // Register plugins
    await fastify.register(cors, { 
      origin: true // In production, restrict this
    });
    
    await fastify.register(websocket, {
      options: { maxPayload: 1048576 }
    });

    // Register routes
    fastify.register(authRoutes, { prefix: '/api/v1/auth' });
    fastify.register(complaintRoutes, { prefix: '/api/v1' });
    fastify.register(websocketRoutes, { prefix: '/ws' });

    // Global error handler
    fastify.setErrorHandler((error, request, reply) => {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Internal Server Error' });
    });

    // Start server
    const port = parseInt(process.env.PORT || '3000', 10);
    await fastify.listen({ port, host: '0.0.0.0' });
    
    fastify.log.info(`Server is listening on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
