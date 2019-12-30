import { FactEffects } from './store/facts.effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import * as fromApp from './store/app.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FactsComponent } from './facts/facts.component';
import { CategoriesComponent } from './facts/categories/categories.component';
import { FactComponent } from './facts/fact/fact.component';
import { AddEditComponent } from './facts/add-edit/add-edit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { environment } from './../environments/environment';
import { LoadingComponent } from './loading/loading.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SortPipe } from './pipes/sort.pipe';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FactsComponent,
    CategoriesComponent,
    FactComponent,
    AddEditComponent,
    NavbarComponent,
    LoadingComponent,
    NotFoundComponent,
    SortPipe,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([FactEffects]),
    StoreDevtoolsModule.instrument({logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
