import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'office',
    loadChildren: () => import('./components/office/office.module').then(m => m.OfficeModule),canActivate:[AuthGuard]
  },
  {
    path:'forms',
    loadChildren: () => import('./components/forms/forms.module').then(m => m.FormsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
