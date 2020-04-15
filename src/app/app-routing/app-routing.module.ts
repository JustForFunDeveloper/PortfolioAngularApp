import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ErrorPageComponent} from '../error-page/error-page.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesModule)},
  {path: 'shopping-list', loadChildren: () => import('../shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
  {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
