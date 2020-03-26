import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../model/recipe.model';
import {RecipeListService} from '../services/recipe-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input()
  recipe: Recipe;

  constructor(private recipeListService: RecipeListService) {
  }

  ngOnInit(): void {
  }

  onToShoppingList() {
    this.recipeListService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
