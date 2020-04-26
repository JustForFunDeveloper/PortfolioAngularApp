import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../model/recipe.model';
import * as RecipeActions from '../store/recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
        return this.http.get<Recipe[]>('https://j4f-portfolioapp.firebaseio.com/recipes.json?');
      }
    ),
    map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put('https://j4f-portfolioapp.firebaseio.com/recipes.json', recipesState.recipes);
    })
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }
}
