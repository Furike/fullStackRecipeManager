import { FastifyInstance } from 'fastify';
import { createRecipeHandler, getRecipesHandler } from './controller';
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
  server.get(
    '/',
    {
      schema: {
        querystring: $ref('getRecipesSchema'),
        response: { 200: $ref('getRecipesResponseSchema') },
      },
    },
    getRecipesHandler,
  );
}

export default recipeRoutes;
