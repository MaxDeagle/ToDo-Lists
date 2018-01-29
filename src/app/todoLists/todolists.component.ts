import { Component, OnInit } from '@angular/core';

import { ToDoList } from '../todolist';
import { Task } from '../task';
import { ToDoService } from '../todo.service';

@Component({
  selector: 'app-todolists',
  templateUrl: './todolists.component.html',
  styleUrls: ['./todolists.component.css']
})
export class ToDoListsComponent implements OnInit {
  lists: ToDoList[];

  newListName: String;
  droppedTask: Task;

  constructor(private todoService: ToDoService) { }

  ngOnInit() {
  	this.getLists();
  }

  getLists(): void {
    this.todoService.getLists()
    .subscribe(lists => {
     this.lists = lists;
    });

  }

  addList($event): void {

  	this.todoService.addList({name:this.newListName}).subscribe(res => {
  		this.lists.push(res);
  		$event.target[0].value = '';
  	});

  }

  deleteList(index): void {
  	console.log(this.lists[index]);
  	this.todoService.deleteList(this.lists[index]["_id"]).subscribe(res => {
  		
  	});
  	this.lists.splice(index, 1);
  }

  addTask(index, $event): void {
    this.todoService.addTask(this.lists[index]["_id"], $event.target[0].value).subscribe(res => { //плохое решение
    	console.log(this.lists[index]);
    	if (this.lists[index].tasks) {
    	  this.lists[index].tasks.push(res);	
    	} else {
          this.lists[index].tasks = [];
          this.lists[index].tasks.push(res);	
    	}
  	});
  }

  deleteTask(indexList, index): void {
  	this.todoService.deleteTask(this.lists[indexList].tasks[index]["_id"]).subscribe(res => {
  		this.lists[indexList].tasks.splice(index, 1);
  	})
  }

  renameList(index, $event): void {
  	var newName = $event.target[0].value;
  	this.todoService.updateList(this.lists[index]["_id"], this.lists[index], newName).subscribe(res => {
  		this.lists[index].name=newName;
  	})
  }

  changeTask(indexList, index, $event) {
  	console.log($event.target[1].checked);
  	var newDesc = $event.target[0].value;
  	this.lists[indexList].tasks[index].isDone = $event.target[1].checked == true ? true : false;

  	this.lists[indexList].tasks[index].description = newDesc;
  	
  	this.todoService.updateTask(this.lists[indexList].tasks[index]["_id"], this.lists[indexList].tasks[index]).subscribe(res => {
  		this.lists[indexList].tasks[index] = res;
  		console.log(res);
  	})
  }

  onItemDrop(index, $event) {
  	if ($event.dragData.data.listId == this.lists[index]["_id"])
  	{
  	  console.log('same list');
  	} else {
  	console.log($event.dragData.listId);


  	this.droppedTask = $event.dragData.data;
  	this.droppedTask["listId"] = this.lists[index]["_id"]; 
  	this.todoService.updateTask($event.dragData.data["_id"], this.droppedTask).subscribe(res => {
  		this.lists[index].tasks.push(res);
  		this.lists[$event.dragData.listId].tasks.splice($event.dragData.taskId, 1);
  	}) 
  }
}

}