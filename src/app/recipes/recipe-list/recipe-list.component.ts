import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../model/recipe.model';
import {RecipeListService} from '../services/recipe-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipesChangedSub: Subscription;
  recipes: Recipe[];

  constructor(private recipeListService: RecipeListService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeListService.getRecipes();
    this.recipesChangedSub = this.recipeListService.recipesChanged
      .subscribe(() => {
        this.recipes = this.recipeListService.getRecipes();
      });
  }

  ngOnDestroy(): void {
    this.recipesChangedSub.unsubscribe();
  }
}
