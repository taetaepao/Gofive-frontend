import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AddUsersRequest } from '../../models/add-users-request.model';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PermissionListComponent } from "../permission-list/permission-list.component";

@Component({
  selector: 'app-dashboard',
  standalone: true, // assuming this is a standalone component
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, PermissionListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private http = inject(HttpClient);
  showModal = false;

  model: AddUsersRequest = {
    firstName: 'Pawarit',
    lastName: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    permission: ''
  };

  openModal() {
    console.log('openModal called'); 
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    console.log('Model:', this.model);
    const apiUrl = 'https://localhost:7216/api/Users';

    this.http.post(apiUrl, this.model)
      .subscribe({
        next: response => {
          console.log('POST successful:', response);
          alert('User added successfully!');
        },
        error: error => {
          console.error('POST error:', error);
          alert('Failed to add user.');
        }
      });

    this.closeModal();
  }
}
