import { FastifyInstance } from 'fastify';
import { createRecipeHandler } from './controller';
import { $ref } from './schema';

async function recipeRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createRecipeSchema'),
        response: { 201: $ref('createRecipeResponseSchema') },
      },
    },
    createRecipeHandler,
  );
}

export default recipeRoutes;
