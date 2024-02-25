import { FastifyReply, FastifyRequest } from 'fastify';
import { createRecipe } from './service';
import { CreateRecipeInput } from './schema';

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
