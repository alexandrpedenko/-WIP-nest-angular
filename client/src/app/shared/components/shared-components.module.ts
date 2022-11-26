import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { HeaderModule } from '@shared/components/header/header.module';
import { ToastModule } from '@shared/components/toast/toast.module';

const imports = [
  CommonModule,
  MaterialModule,
  HeaderModule,
  ToastModule
]

@NgModule({
  imports,
  declarations: [],
  exports: [
    ...imports
  ]
})
export class SharedComponentsModule { }
