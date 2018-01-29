import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from './task';
import { ToDoList } from './todolist';

const httpOptions = {
  headers: new HttpHeaders({'Accept':'application/json', 'Content-Type':'application/json'})
};

@Injectable()
export class ToDoService {

  private listsurl = 'http://localhost:8000/lists';
  private tasksurl = 'http://localhost:8000/tasks';
  private addListUrl = 'http://localhost:8000/lists';
  private deleteListUrl = 'http://localhost:8000/lists/';
  private addTaskUrl = 'http://localhost:8000/tasks/';
  private deleteTaskUrl = 'http://localhost:8000/tasks/';
  private updateListUrl = 'http://localhost:8000/lists/';
  private updateTaskUrl = 'http://localhost:8000/tasks/';

  constructor(
    private http: HttpClient) { }


  getLists(): Observable<ToDoList[]> {
    return this.http.get<ToDoList[]>(this.listsurl);
  }

  addList(newList): Observable<ToDoList> {
    console.log(newList);
    return this.http.post<ToDoList>(this.addListUrl, newList, httpOptions);
  }

  deleteList(id): Observable<ToDoList> {
    console.log(id);
    return this.http.delete<ToDoList>(this.deleteListUrl + id, httpOptions);
  }

  addTask(id, text): Observable<Task> {
    return this.http.post<Task>(this.addTaskUrl, {listId: id, isDone: false, description: text});
  }

  deleteTask(id): Observable<Task> {
    return this.http.delete<Task>(this.deleteTaskUrl + id, httpOptions);
  }

  updateList(id, list, newName): Observable<ToDoList> {
    delete list["_id"];
    list.name = newName;
    console.log(list);
    return this.http.put<ToDoList>(this.updateListUrl + id, JSON.stringify(list), httpOptions);
  }

  updateTask(id, task): Observable<Task> {
    delete task["_id"];
    return this.http.put<Task>(this.updateTaskUrl + id, JSON.stringify(task), httpOptions);
  }
}

