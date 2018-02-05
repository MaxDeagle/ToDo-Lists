import { Input, Component} from '@angular/core';

import { Task } from '../models/task';
import { AppService } from '../services/app.service';
import { TaskService } from '../services/task.service';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'task-component',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent {
	@Input() task: Task;

	subscription: any;

	constructor(private appService: AppService,
		private taskService: TaskService) {
		this.subscription = this.appService.dataChange.asObservable();

		this.subscription
		.pipe(filter(response => (response["type"] == 6) && (response["data"]["_id"] == this.task._id)))
		.subscribe(response => { this.task.description = response.data.description; });

		this.subscription
		.pipe(filter(response => (response["type"] == 7) && (response["data"]["_id"] == this.task._id)))
		.subscribe(response => { this.task.isDone = response.data.isDone; console.log(this.task); });

	}

	renameTask (): void {
		let text = prompt('Okay, you are gonna change your mission from "' + this.task.description + '" to ', 'take a break');
		if (text != '' && text != null) {
			let newTask = Object.assign({}, this.task);
			newTask.description = text;
			this.taskService.renameTask(newTask);
		}    
	}

	deleteTask (): void {
		this.taskService.deleteTask(this.task["_id"]);
	}

	markTask (): void {
		this.taskService.markTask(Object.assign({}, this.task));
	}
}
