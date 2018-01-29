import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';

import { AppComponent } from './app.component';
import { ToDoListsComponent } from './todoLists/todolists.component';
import { ToDoService } from './todo.service';


@NgModule({
  declarations: [
    AppComponent,
    ToDoListsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgDragDropModule.forRoot()
  ],
  providers: [ToDoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
