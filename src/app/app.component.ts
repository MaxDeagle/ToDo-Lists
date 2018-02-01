import { Component, OnInit } from '@angular/core';

import { List } from './models/list';
import { Task } from './models/task';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lists: List[];

  constructor(private todoService: AppService) { }

  ngOnInit() {
  	this.getLists();
  }

  getLists(): void {
    this.todoService.getLists()
    .subscribe(lists => {
     this.lists = lists;
    });

  }
}
