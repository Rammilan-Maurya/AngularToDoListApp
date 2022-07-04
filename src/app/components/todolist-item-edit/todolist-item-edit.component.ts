import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'ItemEdit',
  templateUrl: './todolist-item-edit.component.html'
})
export class TODOListItemEditComponent implements OnInit {
  @Input() ToDoItem:any;
  @Input() Size:string = "";
  @Input() Type : string;

  editItemForm: FormGroup;
  minNameLength = 3;

  constructor(private fb: FormBuilder, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.editItemForm = this.fb.group({
      name: new FormControl(this.ToDoItem.name, [
        Validators.required,
        Validators.minLength(this.minNameLength)
        ])
      });
  }

  onSubmit(): void {   
     
    if(this.editItemForm.valid)
    {
      this.ToDoItem.name  = this.editItemForm.value.name;
      this.ToDoItem.editOn = false;
      this.notifierService.notify('success','Record updated');
    }
    else{
      this.validateAllFormFields(this.editItemForm);
    }    
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => { 
      const control = formGroup.get(field); 
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}