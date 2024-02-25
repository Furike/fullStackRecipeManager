import fastify from 'fastify';
import recipeRoutes from './modules/recipe/route';
import { recipeSchemas } from './modules/recipe/schema';

const server = fastify();

server.get('/ping', async function () {
  return { pong: true };
});

async function main() {
  for (const schema of recipeSchemas) {
    server.addSchema(schema);
  }
  server.register(recipeRoutes, { prefix: '/api/recipes' });
  try {
    await server.listen({ port: 3000 });
    console.log('Server listening on port 3000');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
