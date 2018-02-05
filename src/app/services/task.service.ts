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
  addTask(id, text): void {
    this.http.post(this.addTaskUrl, {listId: id, isDone: false, description: text})
    .toPromise()
    .then(data => {
      Object.assign(data, { type: 3 });
      this.appService.dataChange.next(data);
    });
  }
  
  deleteTask(id): void {
    this.http.delete(this.deleteTaskUrl + id, httpOptions)
    .toPromise()
    .then(data => {
      Object.assign(data, { type: 4 });
      this.appService.dataChange.next(data);
    });
  }
  
  updateTask(id, task): void {
    delete task["_id"];
    this.http.put(this.updateTaskUrl + id, JSON.stringify(task), httpOptions)
    .toPromise()
    .then(data => {
      Object.assign(data, { type: 6 });
      this.appService.dataChange.next(data);
    });
  }
}
