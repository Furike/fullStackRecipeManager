import prisma from '../../utils/prisma';
import { CreateRecipeInput, GetRecipesInput } from './schema';

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

export async function getRecipes(input: GetRecipesInput) {
  const recipes = await prisma.recipe.findMany({
    where: {
      ...(input.title ? { title: { contains: input.title } } : {}),
    },
  });
  return recipes;
}
