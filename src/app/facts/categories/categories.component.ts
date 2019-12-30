import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as factActions from '../../store/facts.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: [];
  loading = false;
  private catSub: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    if(!this.categories) {
      this.store.dispatch(new factActions.GetCategories());
    }
    this.catSub = this.store.select('factsList').subscribe(data=> {
      this.loading = data.loading;
      this.categories = data.categories
    });
  }

  ngOnDestroy() {
    this.catSub.unsubscribe();
  }
}