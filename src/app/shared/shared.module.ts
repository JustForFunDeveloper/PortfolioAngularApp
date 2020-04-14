import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ErrorPageComponent} from '../error-page/error-page.component';
import {LoadingSpinnerComponent} from './components/loading-spinner/loading-spinner.component';
import {AlertComponent} from './components/alert/alert.component';
import {DropdownDirective} from './directives/dropdown.directive';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    ErrorPageComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    ErrorPageComponent,
    CommonModule
  ]
})
export class SharedModule {
}
