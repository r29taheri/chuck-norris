import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddEditComponent } from './facts/add-edit/add-edit.component';
import { FactsComponent } from './facts/facts.component';
import { FactComponent } from './facts/fact/fact.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'facts', component: FactsComponent,
    children: [
      { path: '', component: AddEditComponent },
      { path: ':name', component: FactComponent }
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
