import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';

import {AuthComponent} from './auth.component';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    RouterModule.forChild([{path: '', component: AuthComponent}]),
    SharedModule,
    FormsModule,
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule {
}
