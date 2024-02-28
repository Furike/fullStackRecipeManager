import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createRecipe,
  deleteRecipeById,
  getRecipeById,
  getRecipes,
  updateRecipe,
} from './service';
import { CreateRecipeInput, GetRecipeInput, GetRecipesInput } from './schema';

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

export async function getRecipeHandler(
  request: FastifyRequest<{ Params: GetRecipeInput }>,
  reply: FastifyReply,
) {
  const input = request.params;
  try {
    const recipe = await getRecipeById(input);
    return reply.code(200).send(recipe);
  } catch (error) {
    console.error(error);
    return reply.code(500).send(error);
  }
}

export async function deleteRecipeHandler(
  request: FastifyRequest<{ Params: GetRecipeInput }>,
  reply: FastifyReply,
) {
  const input = request.params;
  try {
    await deleteRecipeById(input);
    return reply.code(204).send();
  } catch (error) {
    console.error(error);
    return reply.code(500).send(error);
  }
}

export async function updateRecipeHandler(
  request: FastifyRequest<{ Params: GetRecipeInput; Body: CreateRecipeInput }>,
  reply: FastifyReply,
) {
  const id = request.params.id;
  const body = request.body;
  try {
    await updateRecipe(id, body);
    return reply.code(200).send();
  } catch (error) {
    console.error(error);
    return reply.code(500).send(error);
  }
}
