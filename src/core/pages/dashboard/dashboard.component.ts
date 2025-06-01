import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AddUsersRequest } from '../../models/add-users-request.model';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PermissionListComponent } from "../permission-list/permission-list.component";
import { PermissionService } from '../../services/permission.service';
import { Permission } from '../../models/permission.model';
import { UserService } from '../../services/user.service';
import { Users } from '../../models/users.model';

@Component({
  selector: 'app-dashboard',
  standalone: true, // assuming this is a standalone component
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, PermissionListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showModal = false;

  model: AddUsersRequest;

  openModal() {
    console.log('openModal called'); 
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  constructor(private userService: UserService,private permissionService : PermissionService) { 
    // Initialize the model if needed
    this.model = {
      firstName: 'Pawarit',
      lastName: '',
      email: '',
      mobile: '',
      username: '',
      password: '',
      permission: ''
    };
    
  }

  onSubmit() {
    this.userService.addUser(this.model).subscribe({
      next: () => {
        console.log('User added successfully');
        alert('User added successfully');

      },
      error: (err) => {
        console.error('Error adding user:', err);
        alert('Failed to add user');
      }
    });

    this.closeModal();
  }

  permissions?: Permission[];
  users? : Users[];
  pagedUsers: Users[] = [];
  ngOnInit(): void {
  this.permissionService.getAllPermissions().subscribe({
    next: (response: Permission[]) => {
      this.permissions = response;
      console.log('Permissions loaded:', this.permissions);
    }
  });

  this.userService.getAllUsers().subscribe({
    next: (response: Users[]) => {
      this.users = response;
      this.totalItems = this.users.length;
      this.updatePagedUsers();
      console.log('Users loaded:', this.users);
    }
  });
}
updatePagedUsers(): void {
  const start = this.startItem;
  const end = this.endItem;
  this.pagedUsers = this.users ? this.users.slice(start, end) : [];
}

itemsPerPage = 6;
currentPage = 1;
totalItems = 10;

  pageSizeOptions = [4, 6, 10, 20];

  get startItem() {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endItem() {
    return Math.min(this.startItem + this.itemsPerPage, this.totalItems);
  }

  onItemsPerPageChange() {
  this.currentPage = 1;
  this.updatePagedUsers();
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePagedUsers();
  }
}

nextPage() {
  if (this.endItem < this.totalItems) {
    this.currentPage++;
    this.updatePagedUsers();
  }
}



}
