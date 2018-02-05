import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';

import { AppService } from './services/app.service';
import { ListService } from './services/list.service';
import { TaskService } from './services/task.service';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgDragDropModule.forRoot()
  ],
  providers: [
  AppService, 
  ListService,
  TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
