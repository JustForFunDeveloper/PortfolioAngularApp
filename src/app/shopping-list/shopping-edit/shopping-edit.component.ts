import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/models/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false})
  form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;


  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(
          new Ingredient(form.value.name, Number(form.value.amount)))
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(
        new Ingredient(form.value.name, Number(form.value.amount))
      ));
    }
    this.editMode = false;
    this.form.reset();
  }

  onClear() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onDeleteAll() {
    this.store.dispatch(new ShoppingListActions.ClearIngredients());
  }
}
