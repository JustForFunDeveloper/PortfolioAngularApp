import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter();

  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10)
  ];

  constructor() {
  }

  getIngredients() {
    return this.ingredients.slice();
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
    this.ingredientsChanged.emit();
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
    this.ingredientsChanged.emit();
  }

  deleteIngredient(id: number) {
    this.getIngredients().splice(id, 1);
    this.ingredientsChanged.emit();
  }

  clearIngredientList() {
    this.ingredients = [];
    this.ingredientsChanged.emit();
  }
}
