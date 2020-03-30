import {Component, OnInit} from '@angular/core';
import {RecipeListService} from './services/recipe-list.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeListService]
})
export class RecipesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
