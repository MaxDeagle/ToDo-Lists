import { Component, OnInit } from '@angular/core';

import { List } from './models/list';
import { Task } from './models/task';
import { AppService } from './services/app.service';
import { ListService } from './services/list.service';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lists: List[];
  subscription: any;
  newList: string = '';

  constructor(
    private appService: AppService,
    private listService: ListService
    ) {
        this.subscription = this.appService.dataChange.asObservable();

        this.subscription
        .pipe(filter(response => response.type == 0))
        .subscribe(response => this.lists = response.data);

        this.subscription
        .pipe(filter(response => response.type == 1))
        .subscribe(response => this.lists.push(response.data));
      
        this.subscription
        .pipe(filter(response => response.type ==2))
        .subscrive(response => {
          let position = response.data.map(function(list) { return list.id; }).indexOf(response.data.id);
          this.lists.splice(position, 1);
        });
      }

  ngOnInit() {
  	this.getLists();
  }

  getLists(): void {
    this.listService.getLists();
  }

  addList(): void {
    console.log(this.newList);
    this.listService.addList(this.newList);
  }
}
