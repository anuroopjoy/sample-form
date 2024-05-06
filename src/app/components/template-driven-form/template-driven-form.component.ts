import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css'],
})
export class TemplateDrivenFormComponent implements OnInit {
  userDetails: {
    userGroupId: string;
    file: File | null;
  } = {
    userGroupId: '',
    file: null,
  };
  constructor(public http: HttpClient) {}

  ngOnInit() {
    console.log('User Details:', this.userDetails);
  }

  onFileChange(event: any) {
    this.userDetails.file = event.target.files[0]; // Access the first selected file
    console.log('Selected file:', this.userDetails.file); // Optional for debugging
  }

  submitForm(form: NgForm): void {
    console.log('Form Data:', form.value);
    if (form.valid && this.userDetails.file) {
      const formData = new FormData();
      formData.append('file', this.userDetails.file);
      // Add any other data you need to send with the request
      formData.append('userDetails', this.userDetails.userGroupId);

      // Make sure to replace 'http://localhost:8080/notification/api/v1/user-group?userGroupId' with your actual API endpoint
      const apiUrl =
        'http://localhost:8080/notification/api/v1/user-group?userGroupId';
      lastValueFrom(this.http.post(apiUrl, formData))
        .then((response) => {
          console.log('API Response:', response);
        })
        .catch((error) => {
          console.error('API Error:', error);
        });
    }
  }
}
