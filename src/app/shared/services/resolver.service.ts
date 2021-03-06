import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {Recipe} from '../../recipes/model/recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<fromApp.AppState>,
              private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.store.select('recipe')
      .pipe(
        take(1),
        map(recipesState => {
          return recipesState.recipes;
        }),
        switchMap(recipes => {
          if (recipes.length === 0) {
            this.store.dispatch(new RecipeActions.FetchRecipes());
            return this.actions$.pipe(
              ofType(RecipeActions.SET_RECIPES),
              take(1)
            );
          } else {
            return of(recipes);
          }
        })
      );
  }
}
