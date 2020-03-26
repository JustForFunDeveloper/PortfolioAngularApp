import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/models/ingredient.model';
import {ShoppingListService} from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onAdd(name: string, amount: string) {
    this.shoppingListService.addIngredient(new Ingredient(name, Number(amount)));
  }

  onClear() {
    this.shoppingListService.clearIngredientList();
  }
}
