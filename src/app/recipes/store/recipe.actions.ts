import {Action} from '@ngrx/store';
import {Recipe} from '../model/recipe.model';

export const SET_RECIPES = '[Shopping List] Set Recipes';
export const ADD_RECIPE = '[Shopping List] Add Recipe';
export const UPDATE_RECIPE = '[Shopping List] Update Recipes';
export const DELETE_RECIPE = '[Shopping List] Delete Recipes';
export const FETCH_RECIPES = '[Shopping List] Fetch Recipes';
export const STORE_RECIPES = '[Shopping List] Store Recipes';

export type RecipeActions =
  | SetRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | FetchRecipes
  | StoreRecipes;

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

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}
