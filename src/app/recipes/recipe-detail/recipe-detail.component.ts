import {Component, OnInit} from '@angular/core';
import {Recipe} from '../model/recipe.model';
import {RecipeListService} from '../services/recipe-list.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  currentId: number;

  constructor(private recipeListService: RecipeListService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentId = Number(params.id);
      this.recipe = this.recipeListService.getRecipeById(this.currentId);
    });
  }

  onToShoppingList() {
    const cloned = this.recipe.ingredients.map(x => Object.assign({}, x));
    this.recipeListService.addIngredientsToShoppingList(cloned);
  }

  onDeleteRecipe() {
    this.recipeListService.deleteRecipe(this.currentId);
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }
}
