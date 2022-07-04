import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Item, ToDoListItem } from 'src/models/todolistitem.model';
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'TODOListItem',
  templateUrl: './todolistitem.component.html'
})
export class TODOListItemComponent {
  @Output() onTODODeleteEmitter = new EventEmitter<string>();
  @Output() onTODOActionEmitter = new EventEmitter<string>();
  @Input() ToDoItem:ToDoListItem;

  constructor(private notifierService: NotifierService) { }

  onTODOItemAction(): void {
    this.onTODOActionEmitter.emit(this.ToDoItem.id);
  }

  onTODODelete(): void {
    this.onTODODeleteEmitter.emit(this.ToDoItem.id);
  }

  onAddTask(taskName:string): void
  {    
    // create new item object
    let newTask:Item = {
      id:  uuidv4(), // generate uuid on server.
      name: taskName,
      done: false,
      editOn: false
    };
    //add item
    this.ToDoItem.tasks = [newTask, ...this.ToDoItem.tasks];
    this.notifierService.notify('success','Task added');   
  }

  onTaskAction(id:string): void{
    let tempTask = this.ToDoItem.tasks.find(function(el){return el.id == id});
    if(tempTask != undefined)
    {
      tempTask.done = !tempTask.done;

      if(tempTask.done)
      {
        this.notifierService.notify('success','Task marked as completed');
      }
      else
      {
        this.notifierService.notify('success','Task marked as pending');
      }
    }   
  }

  onTaskDelete(id:string): void {
    this.ToDoItem.tasks = this.ToDoItem.tasks.filter(function(el){return el.id != id;});
    this.notifierService.notify('success','Task deleted');
  }

}