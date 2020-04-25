import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeListService} from '../../recipes/services/recipe-list.service';
import {Recipe} from '../../recipes/model/recipe.model';
import {map, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../../recipes/store/recipe.actions';

// TODO: replace the url's with environment variables
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeListService: RecipeListService,
              private store: Store<fromApp.AppState>) {
  }

  storeRecipes() {
    const recipes = this.recipeListService.getRecipes();
    this.http.put('https://j4f-portfolioapp.firebaseio.com/recipes.json', recipes)
      .subscribe();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://j4f-portfolioapp.firebaseio.com/recipes.json?')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
          // this.recipeListService.setRecipes(recipes);
          this.store.dispatch(new RecipeActions.SetRecipes(recipes));
        })
      );
  }
}
