import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeListService} from '../../recipes/services/recipe-list.service';
import {Recipe} from '../../recipes/model/recipe.model';
import {ShoppingListService} from '../../shopping-list/services/shopping-list.service';
import {Ingredient} from '../models/ingredient.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeListService: RecipeListService,
              private shoppingListService: ShoppingListService) {
  }

  storeRecipes() {
    const recipes = this.recipeListService.getRecipes();
    this.http.put('https://j4f-portfolioapp.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
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
          this.recipeListService.setRecipes(recipes);
        })
      );
  }

  storeShoppingList() {
    const recipes = this.shoppingListService.getIngredients();
    this.http.put('https://j4f-portfolioapp.firebaseio.com/shoppingList.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchShoppingList() {
    this.http.get<Ingredient[]>('https://j4f-portfolioapp.firebaseio.com/shoppingList.json')
      .subscribe(shoppingList => {
        this.shoppingListService.setIngredients(shoppingList);
      });
  }
}
