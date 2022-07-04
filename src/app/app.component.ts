import { Component } from '@angular/core';
import { v4 as uuidv4 } from "uuid";
import { NotifierService } from 'angular-notifier';
import { ToDoListItem } from 'src/models/todolistitem.model';

let TODOListItemData:ToDoListItem[] = [
  {
    id: "1c0a41bb-d3c4-4218-9f10-32df0063846e",
    name: "Website redesign",
    done: false,
    editOn:false,
    tasks: [
      {
        id:"1c0a41bb-d3c4-5723-9f10-32df0063846e",
        name:"Daily triage of redesign feedback",
        done: false,
        editOn : false
      },
      {
        id:"1c0a41bb-d3c4-8943-9f10-32df0063846e",
        name:"Launch new home page",
        done: false,
        editOn : false
      }
    ]
  },
  {
    id: "0e1c7847-da83-4558-866c-8be656189ced",
    name: "Blog & article creation",
    done: false,
    editOn:false,
    tasks: [
      {
        id:"1c0a41bb-d3c4-9416-9f10-32df0063846e",
        name:"Review announcement blog",
        done: false,
        editOn : false
      }
    ]
  },
  {
    id: "853bbd86-c6a7-40a0-bbae-07605d52fef8",
    name: "Marketing campaign",
    done: true,
    editOn:false,
    tasks: [
      {
        id:"1c0a41bb-d3c4-4902-9f10-32df0063846e",
        name:"Develop messaging & positioning",
        done: false,
        editOn : false
      },
      {
        id:"1c0a41bb-d3c4-7852-9f10-32df0063846e",
        name:"Research campaign measurement tools",
        done: false,
        editOn : false
      }
    ]
  }
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ToDoLists:ToDoListItem[];
  FilteredToDoLists:ToDoListItem[];
  SearchValue:string = "";
  FilterValue:number = 0;
  CompletedCount:number = 0;
  PendingCount:number = 0;

  constructor(private notifierService: NotifierService) {}

  ngOnInit(): void {
    this.ToDoLists =  TODOListItemData;
    this.applyFilter(0, this.SearchValue);
  }

  applyFilter(filter:number, searchValue:string = ""):void{
    this.FilterValue = filter;
    switch(this.FilterValue) {
      case 1:
        this.FilteredToDoLists = this.ToDoLists.filter(function(el){return el.done==false && el.name.toLowerCase().includes(searchValue.toLowerCase())});

        //set count
        this.PendingCount = this.FilteredToDoLists.length;
        this.CompletedCount = this.ToDoLists.filter(function(el){return el.done==true && el.name.toLowerCase().includes(searchValue.toLowerCase())}).length;
        break;
      case 2:
        this.FilteredToDoLists = this.ToDoLists.filter(function(el){return el.done==true && el.name.toLowerCase().includes(searchValue.toLowerCase())});

        //set count
        this.PendingCount = this.ToDoLists.filter(function(el){return el.done==false && el.name.toLowerCase().includes(searchValue.toLowerCase())}).length;
        this.CompletedCount = this.FilteredToDoLists.length;
        break;
      default:
        this.FilteredToDoLists = this.ToDoLists.filter(function(el){return el.name.toLowerCase().includes(searchValue.toLowerCase())});

        //set count
        this.PendingCount = this.ToDoLists.filter(function(el){return el.done==false && el.name.toLowerCase().includes(searchValue.toLowerCase())}).length;
        this.CompletedCount = this.ToDoLists.filter(function(el){return el.done==true && el.name.toLowerCase().includes(searchValue.toLowerCase())}).length;
    }    
  }
 
  onTODOItemAdd(newItem : string): void {  
    // create new item object
    let newTODOList:ToDoListItem = {
      id:  uuidv4(),
      name: newItem,
      done: false,
      editOn: false,
      tasks: []
    };
    this.ToDoLists = [newTODOList, ...this.ToDoLists];
    this.applyFilter(this.FilterValue);
    this.notifierService.notify('success','To Do List item added');   
  }

  onTODOItemAction(id:string): void {
    let tempTodoList = this.ToDoLists.find(function(el){return el.id == id;});
    if(tempTodoList != undefined)
    {
      tempTodoList.done = !tempTodoList.done;
      if(tempTodoList.done)
      {
        this.notifierService.notify('success','TODO list item marked as completed');
      }
      else
      {
        this.notifierService.notify('success','TODO list item marked as pending');
      }
    }
    this.applyFilter(this.FilterValue, this.SearchValue);
  }

  onTODOItemDelete(id: string) {
    this.ToDoLists = this.ToDoLists.filter(function(el){return el.id != id;});
    this.applyFilter(this.FilterValue, this.SearchValue);
    this.notifierService.notify('success','TODO list item deleted');
  }

  onSearch(searchValue:string):void{
    this.applyFilter(this.FilterValue, searchValue);
  }
}