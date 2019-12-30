import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';

import { environment } from './../../environments/environment';
import * as FactActions from './facts.action';

import { Fact } from '../models/fact';

@Injectable()
export class FactEffects {
    baseUrl = environment.baseUrl;
    apiKey = environment.apiKey;
    httpOptions = {
        headers: new HttpHeaders({
        'x-rapidapi-host':  'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
        'Content-Type':  'application/json',
        'X-RapidAPI-Key': this.apiKey
        })
    };
    @Effect()
    getCategories = this.actions$.pipe(
        ofType(FactActions.GET_CATEGORIES),
        switchMap((catData: FactActions.GetCategories) => {
            return this.http.get(`${this.baseUrl}/jokes/categories`, this.httpOptions)
            .pipe(
                map((resData: any) => {
                    return new FactActions.AddCategories(resData)
                }),
                catchError(error => {
                    return of(new FactActions.FailRequest('An uknown error occurred!'));
                })
            );
        })
    )
    @Effect()
    getFact = this.actions$.pipe(
        ofType(FactActions.RANDOM_FACT),
        switchMap((factData: FactActions.RandomFact) => {
            return this.http.get(`${this.baseUrl}/jokes/random?category=${factData.payload}`, this.httpOptions)
            .pipe(
                map((resData: any) => {
                    return new FactActions.AddFact(new Fact(resData.id, resData.categories[0], resData.value));
                }),
                catchError(error => {
                    this.router.navigate(['/not-found']);
                    return of(new FactActions.FailRequest('An uknown error occurred!'));
                })
            );
        }),
    );
    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}