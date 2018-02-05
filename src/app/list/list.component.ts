
import { Component, Input } from '@angular/core';

import { List } from '../models/list';
import { Task } from '../models/task';
import { ListService } from '../services/list.service';
import { AppService } from '../services/app.service';
import { TaskService } from '../services/task.service';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'list-component',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent {
	@Input() list: List;

	subscription: any;

	constructor(private listService: ListService,
		private appService: AppService,
		private taskService: TaskService) 
	{
		this.subscription = this.appService.dataChange.asObservable();

		this.subscription
		.pipe(filter(response => (response["type"] == 3) && (response["data"]["_id"] == this.list._id)))
		.subscribe(response => { this.list.name = response.data.name; });

		this.subscription
		.pipe(filter(response => (response["type"] == 4) && (response["data"]["listId"] == this.list._id)))
		.subscribe(response => { 
			if (this.list.tasks)
				this.list.tasks.push(response.data);
			else
				this.list.tasks = [response.data];
		});

		this.subscription
		.pipe(filter(response => response["type"] == 5))
		.subscribe(response => { 
			let position = this.list.tasks.map(function(task) { return task["_id"]; }).indexOf(response.data["_id"]);
			this.list.tasks.splice(position, 1);
		});

		this.subscription
		.pipe(filter(response => response["type"] == 8))
		.subscribe(response => { 
			let position = this.list.tasks.map(function(task) { return task["_id"]; }).indexOf(response.data["_id"]);
			console.log(response.data);
			console.log(this.list.tasks);
			if (position >= 0)
				this.list.tasks.splice(position, 1);

			if (this.list["_id"] == response.data["listId"])
				this.list.tasks.push(response.data);
		});
	}
	
	deleteList(): void {
		this.listService.deleteList(this.list["_id"]);
	}

	updateList(): void {
		let name = prompt('Here it goes a new name: ', 'Dummy');
		if (name != '' && name != null) {
			let newList = Object.assign({}, this.list);
			newList.name = name;
			this.listService.updateList(newList);
		}    
	}

	addTask(): void {
		let task = prompt('Here it goes a new task for list ' + this.list.name + ': ', 'Code');
		if (task != '' && task != null) {
			this.taskService.addTask(this.list["_id"], task);
		}
	}

	onItemDrop($event) {
		this.taskService.moveTask(this.list["_id"], Object.assign({}, $event.dragData));
	}
}
