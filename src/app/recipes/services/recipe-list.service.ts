import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from '../model/recipe.model';
import {Ingredient} from '../../shared/models/ingredient.model';
import {ShoppingListService} from '../../shopping-list/services/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeListService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Steak',
      'This is a description',
      'https://www.fuersie.de/sites/fuersie/files/styles/1024x768/public/images/perfektes-steak.jpg?itok=iwGZvlND',
      [
        new Ingredient('Apple', 2),
        new Ingredient('Orange', 3),
        new Ingredient('Steak', 1)]),
    new Recipe('Spaghetti',
      'This is a description2',
      'https://www.gutekueche.at/img/rezept/3610/spaghetti-puttanesca.png',
      [
        new Ingredient('French Fries', 20),
        new Ingredient('Bread', 2),
        new Ingredient('Steak', 1)]),
    new Recipe('Züricher Geschnetzeltes vom Schwein mit Spätzle',
      'This is a description2',
      'https://www.allekochen.com/wp-content/uploads/2019/01/Z%C3%BCricher-Geschnetzeltes-vom-Schwein-mit-Sp%C3%A4tzle01.jpg',
      [
        new Ingredient('Sausage', 12),
        new Ingredient('Sauerkraut', 1),
        new Ingredient('Potato', 10)]),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  constructor(private shoppingListService: ShoppingListService) {
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
