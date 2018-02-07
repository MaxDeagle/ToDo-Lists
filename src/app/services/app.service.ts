
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap, filter } from 'rxjs/operators';

import { Task } from '../models/task';
import { List } from '../models/list';
import { ApiService } from './api.service';

const httpOptions = {
  headers: new HttpHeaders({'Accept':'application/json', 'Content-Type':'application/json'})
};

@Injectable()
export class AppService {

  LISTS_URL = 'http://localhost:8000/lists';
  TASKS_URL = 'http://localhost:8000/tasks';

  dataChange: BehaviorSubject<Array<List>>;

  constructor(private apiService: ApiService) { 
    this.dataChange = new BehaviorSubject([]);
  }

  getLists(): void {
    this.apiService.get(this.LISTS_URL).subscribe( (data: List[]) => {
      this.dataChange.next(data);
    });

  }

  addList(newList): void {
    let list = { name: newList }; 
    this.apiService.post(this.LISTS_URL, list).subscribe( (data: List) => {
      this.dataChange.next([...this.dataChange.getValue(), data]);
    });

  }
  
  deleteList(id): void {
    this.apiService.delete(this.LISTS_URL + '/' + id).subscribe( (data: List) => {
      let lists = this.dataChange.getValue().filter(list => list._id != data._id);
      this.dataChange.next(lists);
    });
  }
  
  
  updateList(list): void {
    let id = list._id;
    delete list._id;
    this.apiService.put(this.LISTS_URL + '/' + id, list).subscribe( (data: List) => {
      let list = this.dataChange.getValue()
        .filter(list => list._id == data._id)[0];
      list.name = data.name;

      let lists = this.dataChange.getValue()
        .map(function(item): List { 
          return item._id == data._id ? list : item; });

      this.dataChange.next(lists);
    });
  }

  addTask(listId, text): void {
    let body = {listId: listId, isDone: false, description: text};
    this.apiService.post(this.TASKS_URL, body).subscribe( (data: Task) => {
      this.dataChange.getValue()
        .map(function(item): List {
          if (item._id == data.listId) {
            console.log(item.tasks);
            console.log(data);
            item.tasks.push(data);
            return item;
          }

          return item;
        });        
    });
  }
  
  deleteTask(id): void {
    this.apiService.delete(this.TASKS_URL + '/' + id).subscribe( (data: Task) => {
      let lists = this.dataChange.getValue()
        .map(list => {
          let index = this.findTaskIndexInList(list, data);
          if (index == -1) {
            return list;
          }

          list.tasks.splice(index, 1);
          return list;
        });
      this.dataChange.next(lists);
    });
  }
  
  renameTask(task): void {
    let taskId = task._id;
    delete task._id;
    this.apiService.put(this.TASKS_URL + '/' + taskId, task).subscribe( (data: Task) => {
      let lists = this.dataChange.getValue()
      .map(list => {
        let index = this.findTaskIndexInList(list, data);
        if (index == -1) {
          return list;
        }

        list.tasks[index] = data;
        return list;
      })
    });

  }

  markTask(task): void {
    let taskId = task._id;
    delete task._id;
    task.isDone = !task.isDone;
    this.apiService.put(this.TASKS_URL + '/' + taskId, task).subscribe( (data: Task) => {
      let lists = this.dataChange.getValue()
      .map(list => {
        let index = this.findTaskIndexInList(list, data);
        if (index == -1) {
          return list;
        }

        list.tasks[index] = data;
        return list;
      })
    });

  }

  moveTask(listId, task): void {
    let taskId = task._id;
    let oldListId = task.listId;
    delete task._id;
    task.listId = listId;
    this.apiService.put(this.TASKS_URL + '/' + taskId, task).subscribe( (data: Task) => {
      let lists = this.dataChange.getValue()
      .map(list => {
        let index = this.findTaskIndexInList(list, data);
        if (index != -1) {
          list.tasks.splice(index, 1);
          return list;
        }

        if (list._id == data.listId) {
          list.tasks.push(data);
        }

        return list;
      })
    });
  }

  private findTaskIndexInList(list, task) {
    return list.tasks.map(function(elem) {
          return elem._id;
    }).indexOf(task._id);
  }

}

