import { FastifyInstance } from 'fastify';
import {
  createRecipeHandler,
  deleteRecipeHandler,
  getRecipeHandler,
  getRecipesHandler,
} from './controller';
import { $ref } from './schema';

async function recipeRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createRecipeSchema'),
        response: { 201: $ref('recipeResponseSchema') },
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
  server.get(
    '/:id',
    {
      schema: {
        params: $ref('getRecipeSchema'),
        response: { 200: $ref('recipeResponseSchema') },
      },
    },
    getRecipeHandler,
  );
  server.delete(
    '/:id',
    {
      schema: {
        params: $ref('getRecipeSchema'),
      },
    },
    deleteRecipeHandler,
  );
}

export default recipeRoutes;
