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
export class TaskService { 
  private tasksurl = 'http://localhost:8000/tasks';

  constructor(
    private http: HttpClient, 
    private appService: AppService
    ) { }

  addTask(id, text): void {
    this.http.post(this.tasksurl, {listId: id, isDone: false, description: text})
    .toPromise()
    .then(data => {
      Object.assign(data, { type: 4 });
      this.appService.dataChange.next(data);
      console.log('done');
    });
  }
  
  deleteTask(id): void {
    this.http.delete(this.tasksurl + '/' + id, httpOptions)
    .toPromise()
    .then(data => {
      Object.assign(data, { type: 5 });
      this.appService.dataChange.next(data);
    });
  }
  
  renameTask(task): void {
    let taskId = task["_id"];
    delete task["_id"];
    this.http.put(this.tasksurl + '/' + taskId, JSON.stringify(task), httpOptions)
    .toPromise()
    .then(data => {
      Object.assign(data, { type: 6 });
      this.appService.dataChange.next(data);
    });
  }

  markTask(task): void {
    let taskId = task["_id"];
    delete task["_id"];
    task.isDone = !task.isDone;
    this.http.put(this.tasksurl + '/' + taskId, JSON.stringify(task), httpOptions)
    .toPromise()
    .then(data => {
      Object.assign(data, { type: 7 });
      this.appService.dataChange.next(data);
    });
  }

  moveTask(listId, task): void {
    let taskId = task["_id"];
    delete task["_id"];
    task.listId = listId;
    this.http.put(this.tasksurl + '/' + taskId, JSON.stringify(task), httpOptions)
    .toPromise()
    .then(data => {
      Object.assign(data, { type: 8 });
      this.appService.dataChange.next(data);
    });
  }
}
