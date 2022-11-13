import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginActivate } from '@shared/guards/login-activate.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [ LoginActivate ],
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
