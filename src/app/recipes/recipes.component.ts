import {Component, OnInit} from '@angular/core';
import {Recipe} from './model/recipe.model';
import {RecipeListService} from './services/recipe-list.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeListService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeListService: RecipeListService) {
  }

  ngOnInit(): void {
    this.recipeListService.recipeSelected
      .subscribe((recipe: Recipe) => {
        this.selectedRecipe = recipe;
      });
  }
}
