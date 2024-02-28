import getNFirstWords from '../../utils/getNFirstWords';
import prisma from '../../utils/prisma';
import { CreateRecipeInput, GetRecipeInput, GetRecipesInput } from './schema';

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
    include: {
      ingredients: {
        select: {
          name: true,
        },
      },
    },
  });
  const recipesWithDescriptions = recipes.map(({ instructions, ...rest }) => ({
    //take only first 5 words of the instructions
    instructions: getNFirstWords(instructions, 5),
    ...rest,
  }));
  return recipesWithDescriptions;
}

export async function getRecipeById(input: GetRecipeInput) {
  const recipe = await prisma.recipe.findFirst({
    where: {
      id: input.id,
    },
    include: {
      ingredients: true,
    },
  });
  return recipe;
}

export async function deleteRecipeById(input: GetRecipeInput) {
  const deleteIngredients = prisma.ingredient.deleteMany({
    where: {
      recipeId: input.id,
    },
  });

  const deleteRecipes = prisma.recipe.delete({
    where: {
      id: input.id,
    },
  });

  await prisma.$transaction([deleteIngredients, deleteRecipes]);
}

export async function updateRecipe(
  id: GetRecipeInput['id'],
  recipe: CreateRecipeInput,
) {
  const { ingredients, ...rest } = recipe;
  const deleteIngredients = prisma.ingredient.deleteMany({
    where: {
      recipeId: id,
    },
  });
  const updateRecipe = prisma.recipe.update({
    where: {
      id,
    },
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
  await prisma.$transaction([deleteIngredients, updateRecipe]);
}
