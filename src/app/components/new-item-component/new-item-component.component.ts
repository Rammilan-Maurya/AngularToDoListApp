import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'NewItemComponent',
  templateUrl: './new-item-component.component.html'
})
export class NewItemComponentComponent implements OnInit {
  @Output() onItemSaveEmitter = new EventEmitter<string>();
  @Input() Type : string;
  @Input() Size : string = "";
  newItemForm: FormGroup;
  minNameLength = 3;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newItemForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minNameLength)
        ])
      });
  }

  onSubmit(): void {   
    if(this.newItemForm.valid)
    {
      this.onItemSaveEmitter.emit(this.newItemForm.value.name);
      this.newItemForm.reset();
    }
    else{
      this.validateAllFormFields(this.newItemForm);
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