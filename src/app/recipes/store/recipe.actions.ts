import {Action} from '@ngrx/store';
import {Recipe} from '../model/recipe.model';

export const SET_RECIPES = '[Shopping List] Set_Recipes';
export const ADD_RECIPE = '[Shopping List] Add_Recipe';
export const UPDATE_RECIPE = '[Shopping List] Update_Ingredient';
export const DELETE_RECIPE = '[Shopping List] Delete_Ingredient';

export type RecipeActions =
  | SetRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe;

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { recipe: Recipe, id: number }) {
  }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {
  }
}
