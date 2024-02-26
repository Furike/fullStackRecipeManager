import { FastifyReply, FastifyRequest } from 'fastify';
import { createRecipe, getRecipes } from './service';
import { CreateRecipeInput, GetRecipesInput } from './schema';

export async function createRecipeHandler(
  request: FastifyRequest<{
    Body: CreateRecipeInput;
  }>,
  reply: FastifyReply,
) {
  const body = request.body;
  try {
    const recipe = await createRecipe(body);
    return reply.code(201).send(recipe);
  } catch (error) {
    console.error(error);
    return reply.code(500).send(error);
  }
}

export async function getRecipesHandler(
  request: FastifyRequest<{ Querystring: GetRecipesInput }>,
  reply: FastifyReply,
) {
  const query = request.query;
  try {
    const recipes = await getRecipes(query);
    return reply.code(200).send(recipes);
  } catch (error) {
    console.error(error);
    return reply.code(500).send(error);
  }
}
