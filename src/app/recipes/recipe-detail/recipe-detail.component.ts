import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {Recipe} from '../model/recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  currentId: number;

  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        map(params => {
          this.currentId = Number(params.id);
          return +params.id;
        }),
        switchMap(id => {
          return this.store.select('recipe');
        }),
        map(recipeState => {
          return recipeState.recipes
            .find((recipe, index) => {
              return index === this.currentId;
            });
        })
      ).subscribe(recipe => {
      this.recipe = recipe;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onToShoppingList() {
    const cloned = this.recipe.ingredients.map(x => Object.assign({}, x));
    this.store.dispatch(new ShoppingListActions.AddIngredients(cloned));
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.currentId));
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }
}
