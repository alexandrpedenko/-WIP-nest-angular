import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from '@search/search.component';
import { HomeComponent } from '@home/home.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
