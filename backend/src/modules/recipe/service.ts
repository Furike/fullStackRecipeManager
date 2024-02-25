import prisma from '../../utils/prisma';
import { CreateRecipeInput } from './schema';

export async function createRecipe(input: CreateRecipeInput) {
  const { ingredients, ...rest } = input;
  const recipe = await prisma.recipe.create({
    data: {
      ...rest,
      ingredients: {
        create: ingredients,
      },
    },
    include: {
      ingredients: {
        select: {
          id: true,
          name: true,
          quantity: true,
          unit: true,
        },
      },
    },
  });
  return recipe;
}
