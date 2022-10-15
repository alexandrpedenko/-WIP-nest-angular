import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { HeaderModule } from '@shared/components/header/header.module';

const imports = [
  CommonModule,
  MaterialModule,
  HeaderModule
]

@NgModule({
  imports,
  declarations: [],
  exports: [
    ...imports
  ]
})
export class SharedComponentsModule { }
