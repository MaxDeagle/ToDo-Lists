import { Component, OnInit } from '@angular/core';

import { List } from './models/list';
import { Task } from './models/task';
import { AppService } from './services/app.service';

import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	lists: List[];
	newList: string = '';

	constructor(private appService: AppService) {
	  this.appService.dataChange.asObservable()
	    .subscribe(lists => {
	      this.lists = lists;
	  });
	}

	ngOnInit() {
	  this.getLists();
	}

	getLists(): void {
	  this.appService.getLists();
	}

	addList(): void {
	  console.log(this.newList);
	  this.appService.addList(this.newList);
	}
}
