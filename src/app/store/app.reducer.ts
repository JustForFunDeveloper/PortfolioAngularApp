import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromRecipe from '../recipes/store/recipe.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.State;
  recipe: fromRecipe.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  recipe: fromRecipe.recipeReducer,
  auth: fromAuth.authReducer
};
