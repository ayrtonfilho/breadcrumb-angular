import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkComponent } from './pages/work/work.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'about', component: AboutComponent, data: { breadcrumb: 'About'},
    
    children: [
      {
        path: 'work', component: WorkComponent, data: { breadcrumb: 'Work'}
      }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
