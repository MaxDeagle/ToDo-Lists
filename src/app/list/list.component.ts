
import { Component, Input } from '@angular/core';

import { List } from '../models/list';
import { Task } from '../models/task';
import { ListService } from '../services/list.service';

@Component({
  selector: 'list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
	@Input() list: List;
  
  constructor(
    private listService: ListService
    ) { }
  
  deleteList(): void {
    this.listService.deleteList(this.list["_id"]);
  }
}
