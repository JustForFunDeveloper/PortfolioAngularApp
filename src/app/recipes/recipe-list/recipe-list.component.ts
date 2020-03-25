import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Steak',
      'This is a description',
      'https://www.fuersie.de/sites/fuersie/files/styles/1024x768/public/images/perfektes-steak.jpg?itok=iwGZvlND'),
    new Recipe('Spaghetti',
      'This is a description2',
      'https://www.gutekueche.at/img/rezept/3610/spaghetti-puttanesca.png'),
    new Recipe('Züricher Geschnetzeltes vom Schwein mit Spätzle',
      'This is a description2',
      'https://www.allekochen.com/wp-content/uploads/2019/01/Z%C3%BCricher-Geschnetzeltes-vom-Schwein-mit-Sp%C3%A4tzle01.jpg'),
  ];

  @Output()
  recipeWasSelected = new EventEmitter<Recipe>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
