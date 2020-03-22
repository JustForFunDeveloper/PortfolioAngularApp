import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Name',
      'This is a description',
      'https://www.fuersie.de/sites/fuersie/files/styles/1024x768/public/images/perfektes-steak.jpg?itok=iwGZvlND'),
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
