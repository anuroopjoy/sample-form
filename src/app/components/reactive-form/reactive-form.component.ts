import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
})
export class ReactiveFormComponent implements OnInit {
  userForm!: FormGroup; // Add ! to indicate that this property will be initialized in ngOnInit

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userGroupId: ['', Validators.required],
      notificationTypeId: ['', Validators.required],
      scheduleDTO: this.formBuilder.group({
        name: ['', Validators.required],
        scheduleDateTime: ['', Validators.required],
        scheduleType: ['', Validators.required],
        frequency: ['', Validators.required],
        interval: ['', Validators.required],
        repeatEndDateTime: ['', Validators.required]
      }),
      templateDTO: this.formBuilder.group({
        name: ['', Validators.required],
        header: ['', Validators.required],
        message: ['', Validators.required]
      }),
      notificationTypeID: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.userForm.valid) {
      console.log('Form data:', this.userForm.value);
      // Add logic to handle form submission
    } else {
      console.error('Form is invalid');
      // Handle form validation errors if needed
    }
  }
}
