import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@shared/material/material.module';
import { CustomSearchControlComponent } from './custom-search-control/custom-search-control.component';

@NgModule({
  declarations: [
    CustomSearchControlComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    CustomSearchControlComponent
  ],
})
export class SearchControlModule { }
