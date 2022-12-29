import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from '@search/search.component';
import { HomeComponent } from '@home/home.component';
import { ProfileComponent } from '@profile/profile.component';
import { ProfileUpdateComponent } from '@profile/profile-update/profile-update.component';
import { CurrentUserActivate } from '@shared/guards/current-user-activate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
  },
  {
    path: '',
    children: [
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
      },
      {
        path: 'profile/:id/update',
        component: ProfileUpdateComponent,
        canActivate: [CurrentUserActivate]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
