import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ActivatedRoute } from '@angular/router';
import { Fact } from '../../models/fact';
import * as factActions from '../../store/facts.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.scss']
})
export class FactComponent implements OnInit, OnDestroy {
  facts: Fact[];
  catName: string;
  loading: boolean;
  sortBy = 'asc';
  private factSub: Subscription;
  private getCatSub: Subscription;
  
  constructor(private router: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.getCategoryName();
    this.factSub = this.store.select('factsList').subscribe(factState => {
      this.facts = factState.facts.filter(fact => {
        return fact.category === this.catName;
      });
      this.loading = factState.loading;
    });
  }

  getCategoryName() {
    this.getCatSub = this.router.params.subscribe(params => {
      this.catName = params.name;
      this.store.dispatch(new factActions.RandomFact(params.name));
    })
  }

  getFact(name: string) {
    this.store.dispatch(new factActions.RandomFact(name));
  }

  onRemove(id: string) {
    this.store.dispatch(new factActions.DeleteFact(id))
  }

  ngOnDestroy() {
    this.factSub.unsubscribe();
    this.getCatSub.unsubscribe();
  }
}
