
import { Component, Input } from '@angular/core';

import { List } from '../models/list';
import { Task } from '../models/task';
import { AppService } from '../services/app.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'list-component',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    @Input() list: List;

    subscription: any;

    constructor(private appService: AppService) 
    {  }
    
    deleteList(): void {
      this.appService.deleteList(this.list._id);
    }

    updateList(): void {
      let name = prompt('Here it goes a new name: ', 'Dummy');
      if (name != '' && name != null) {
           let newList = Object.assign({}, this.list);
        newList.name = name;
        this.appService.updateList(newList);
        }    
    }

    addTask(): void {
      let task = prompt('Here it goes a new task for list ' + this.list.name + ': ', 'Code');
      if (task != '' && task != null) {
        this.appService.addTask(this.list._id, task);
        }
    }

    onItemDrop($event) {
      this.appService.moveTask(this.list._id, Object.assign({}, $event.dragData));
    }
}
