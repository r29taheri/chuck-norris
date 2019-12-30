import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Fact } from '../../models/fact';
import * as factActions from '../../store/facts.action';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit, OnDestroy{
  constructor(private router: ActivatedRoute, private _location: Location, private store: Store<fromApp.AppState>) { }
  @ViewChild('f', {static: true}) factForm: NgForm;
  private editSub: Subscription;
  facts: Observable<{ facts: Fact[]}>;
  categories: [] = [];
  category: string;
  factId: string;
  onEdit: boolean;
  ngOnInit() {
      this.getCategories();
      this.checkEdit();
  }
  checkEdit() {
    this.editSub = this.router.queryParams.subscribe(params => {
      if(params.id) {
        this.factId = params.id;
        this.store.dispatch(new factActions.StartEdit(this.factId));
        let fact: Fact;
        this.store.select('factsList').subscribe(stateData => {
          if(stateData.editedFactId !== 'none') {
            fact = stateData.editedFact;
            this.categories = stateData.categories;
            if(fact) {
              this.factForm.form.patchValue({
                category: fact.category,
                description: fact.description
              })
              this.onEdit = true;
            }
          }
        })
      } else {
        this.onEdit = false;
        this.factId = '';
        this.factForm.reset();
        this.store.select('factsList').subscribe(stateData => {
            this.categories = stateData.categories;
        })
      }
    })
  }
  getCategories() {
    this.store.dispatch(new factActions.GetCategories());
  }
  onSubmit() {
    const id = `custom-${Date.now()}`;
    if(this.factId) {
      let index: number;
      this.store.select('factsList').subscribe(fact => {
        index = fact.facts.findIndex(fact => fact.id === this.factId);
      });
      const editFact = new Fact(this.factId, this.factForm.value.category, this.factForm.value.description);
      this.store.dispatch(new factActions.UpdateFact({index: index, fact: editFact}));
      this.store.dispatch(new factActions.StopEdit());
      this._location.back();
    } else {
      const newFact = new Fact(id, this.factForm.value.category, this.factForm.value.description);
      this.store.dispatch(new factActions.AddFact(newFact));
      this.onEdit = false;
      this.factForm.reset();
    }
  }
  
  ngOnDestroy() {
    if(this.editSub) {
      this.editSub.unsubscribe();
    }
    this.store.dispatch(new factActions.StopEdit());
  }
}