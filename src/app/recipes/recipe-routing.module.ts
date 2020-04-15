import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RecipesComponent} from './recipes.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {ResolverService} from '../shared/services/resolver.service';
import {AuthGuardService} from '../auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: '', component: RecipesComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [ResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [ResolverService]},
      {path: '**', redirectTo: '/not-found'}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule {
}
