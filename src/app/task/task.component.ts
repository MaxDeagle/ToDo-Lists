import { Input, Component} from '@angular/core';

import { Task } from '../models/task';
import { AppService } from '../services/app.service';

@Component({
	selector: 'task-component',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent {
	@Input() task: Task;

	subscription: any;

	constructor(private appService: AppService) {
	}

	renameTask (): void {
		let text = prompt('Okay, you are gonna change your mission from "' + this.task.description + '" to ', 'take a break');
		if (text != '' && text != null) {
			let newTask = Object.assign({}, this.task);
			newTask.description = text;
			this.appService.renameTask(newTask);
		}    
	}

	deleteTask (): void {
		this.appService.deleteTask(this.task["_id"]);
	}

	markTask (): void {
		this.appService.markTask(Object.assign({}, this.task));
	}
}
