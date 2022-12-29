import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { MaterialModule } from '@shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ProfileModule { }
