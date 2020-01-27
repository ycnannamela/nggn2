import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { Car } from './car.model';
import json from './cars-large.json';


@Injectable()
export class CarService {

    constructor(private http: HttpClient) { }

    public getCars(): Observable<any> {
      return Observable.of(json).pipe(delay(1000));
    }
}