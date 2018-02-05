
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, filter } from 'rxjs/operators';

import { Task } from '../models/task';
import { List } from '../models/list';

const httpOptions = {
  headers: new HttpHeaders({'Accept':'application/json', 'Content-Type':'application/json'})
};

@Injectable()
export class AppService {

  dataChange: BehaviorSubject<any>;

  constructor() { 
    this.dataChange = new BehaviorSubject({} as any);
  }



}

