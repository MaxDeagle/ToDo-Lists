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
}
