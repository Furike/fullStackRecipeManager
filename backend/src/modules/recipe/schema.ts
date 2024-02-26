import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const createRecipeCore = {
  title: z.string(),
  instructions: z.string(),
};

const createIngredientCore = {
  name: z.string(),
  quantity: z.number(),
  unit: z.string(),
};

const createRecipeSchema = z.object({
  ...createRecipeCore,
  ingredients: z.array(z.object({ ...createIngredientCore })),
});

const createRecipeResponseSchema = z.object({
  id: z.number(),
  ingredients: z.array(z.object({ id: z.number(), ...createIngredientCore })),
  ...createRecipeCore,
});

const getRecipesSchema = z.object({
  title: z.string().optional(),
});

const getRecipesResponseSchema = z.array(
  z.object({
    id: z.number(),
    ...createRecipeCore,
  }),
);

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type GetRecipesInput = z.infer<typeof getRecipesSchema>;

export const { schemas: recipeSchemas, $ref } = buildJsonSchemas({
  createRecipeSchema,
  createRecipeResponseSchema,
  getRecipesSchema,
  getRecipesResponseSchema,
});
