import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AddUsersRequest } from '../../models/add-users-request.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',

  imports: [ RouterModule,CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showModal = false;

  openModal() {
    console.log('openModal called'); 
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  model: AddUsersRequest;

  constructor() {
    this.model = {
      firstName: 'Pawarit',
      lastName: '',
      email: '',
      mobile: '',
      username: '',
      password: ''
    };
  }
  onSubmit() {
    console.log('Form submitted');
    console.log('Model:', this.model);
    this.closeModal();
  }
}
