import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, filter } from 'rxjs/operators';

import { Task } from '../models/task';
import { List } from '../models/list';
import { AppService } from './app.service';

const httpOptions = {
  headers: new HttpHeaders({'Accept':'application/json', 'Content-Type':'application/json'})
};

@Injectable()
export class ListService { 
  private listsurl = 'http://localhost:8000/lists';

  constructor(
  	private http: HttpClient, 
  	private appService: AppService
  	) { }
  

  getLists(): void {
  	this.http.get(this.listsurl)
  	.toPromise()
  	.then(data => { 
  		Object.assign(data, { type: 0 });
  		this.appService.dataChange.next(data);
  	});
  }

  addList(newList): void {
  	let list = { name: newList };
  	this.http.post(this.listsurl, list, httpOptions)
  	.toPromise()
  	.then(data => {
  		Object.assign(data, { type: 1 });
  		this.appService.dataChange.next(data);
  	});
  }
  
  deleteList(id): void {
    this.http.delete(this.deleteListUrl + id, httpOptions)
    .toPromise()
    .then(data => {
      Object.assign(data, { type: 2 });
      this.appService.dataChange.next(data);
    });
  }
  
    
  updateList(id, list, newName): void {
    delete list["_id"];
    list.name = newName;
    this.http.put(this.updateListUrl + id, JSON.stringify(list), httpOptions)
    .toPromise()
    .then(data => {
      Object.assign(data, { type: 5 });
      this.appService.dataChange.next(data);
    });
  }
}
