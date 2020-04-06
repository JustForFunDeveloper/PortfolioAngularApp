import {Injectable} from '@angular/core';
import {Ingredient} from '../../shared/models/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10)
  ];

  constructor() {
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    let itemExists = false;
    for (const localItem of this.ingredients) {
      if (localItem.name === ingredient.name) {
        localItem.amount += ingredient.amount;
        itemExists = true;
        break;
      }
    }
    if (!itemExists) {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    let itemExists = false;
    for (const newItem of ingredients) {
      for (const localItem of this.ingredients) {
        if (localItem.name === newItem.name) {
          localItem.amount += newItem.amount;
          itemExists = true;
          break;
        }
      }
      if (!itemExists) {
        this.ingredients.push(newItem);
      }
      itemExists = false;
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  clearIngredientList() {
    this.ingredients = [];
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
