
import { Component, Input } from '@angular/core';

import { List } from '../models/list';
import { Task } from '../models/task';
import { AppService } from '../services/app.service';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
	@Input() list: List;
}