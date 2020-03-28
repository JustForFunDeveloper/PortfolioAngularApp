import {Component, OnInit} from '@angular/core';
import {Recipe} from '../model/recipe.model';
import {RecipeListService} from '../services/recipe-list.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  currentId: number;

  constructor(private recipeListService: RecipeListService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.currentId = Number(params.id);
      this.recipe = this.recipeListService.getRecipeById(this.currentId);
    });
  }

  onToShoppingList() {
    this.recipeListService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
