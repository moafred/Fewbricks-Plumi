import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { CONJUGATIONS } from '@plumi/shared';

const PORT = Number(process.env.PORT);
// Origines CORS autorisées : web dev, Capacitor iOS/Android, production
const CORS_ORIGINS = [
  'http://localhost:5184',
  'capacitor://localhost',
  'https://localhost',
  process.env.CORS_ORIGIN,
].filter((origin): origin is string => Boolean(origin));

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: CORS_ORIGINS, credentials: true });
await fastify.register(helmet);

// Health check
fastify.get('/health', async () => ({ status: 'ok' }));

// API — conjugaisons disponibles
fastify.get('/api/conjugations', async () => CONJUGATIONS);

try {
  await fastify.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`Plumi backend running on port ${PORT}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
