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
  isEditMode = false;
  selectedUserId: string | null = null;
  model: AddUsersRequest;

  constructor(private userService: UserService,private permissionService : PermissionService) { 
    // Initialize the model if needed
    this.model = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      permission: ''
    };
  }

  openModal() {
    console.log('openModal called'); 
    this.isEditMode = false; // Reset to add mode
    this.selectedUserId = null; // Clear selected user ID
    this.showModal = true;

  }

  onEdit(userId: string): void {
    console.log('Edit user with ID:', userId);
    this.isEditMode = true;
    this.selectedUserId = userId;

    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.model = { ...user };  // Pre-fill the form
        this.showModal = true;
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  closeModal() {
    this.showModal = false;
    this.isEditMode = false; // Reset to add mode
    this.selectedUserId = null; // Clear selected user ID
  }

    

  onSubmit(): void {
  if (this.isEditMode) {
    // Call update service
    if (this.selectedUserId) {
      this.userService.updateUser(this.selectedUserId, this.model).subscribe({
        next: () => {
          this.closeModal();
          this.loadUsers(); // Refresh list
        },
        error: err => {
          console.error('Error updating user:', err);
        }
      });
    } else {
      console.error('No user selected for update.');
    }
  } else {
    // Call add/create service
    this.userService.addUser(this.model).subscribe({
      next: () => {
        this.closeModal();
        this.loadUsers(); // Refresh list
      },
      error: err => {
        console.error('Error adding user:', err);
      }
      });
    }
  }

  pageSize = 3; // Default page size
  selectedSort: string = 'updatedat';
  searchTerm: string = '';

  loadUsers(): void {
    this.userService.getPagedUsers(this.currentPage,this.itemsPerPage,this.selectedSort,this.searchTerm).subscribe({
      next: (response) => {
        this.users = response.users;
        this.totalItems = response.totalcount;
        this.totalPage = Math.ceil(this.totalItems / this.itemsPerPage);
        this.updatePagedUsers();
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      }
    });
  }

  permissions?: Permission[];
  users? : Users[];
  ngOnInit(): void {
    this.permissionService.getAllPermissions().subscribe({
      next: (response: Permission[]) => {
        this.permissions = response;
        console.log('Permissions loaded:', this.permissions);
      }
    });

    this.userService.getPagedUsers(this.currentPage,this.itemsPerPage,this.selectedSort,this.searchTerm).subscribe({
      next: (response) => {
        this.users = response.users;
        this.totalItems = response.totalcount;
        this.totalPage = Math.ceil(this.totalItems / this.itemsPerPage);
        console.log('Users loaded:', response.users);
        console.log('Total items:', response.totalcount);
      }
    });
  }
  updatePagedUsers(): void {
    const start = this.startItem;
    const end = this.endItem;
    this.loadUsers();
    this.totalPage = Math.ceil(this.totalItems / this.itemsPerPage);
  }
  onDelete(userId: string): void {
    console.log('Delete user with ID:', userId);
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users = (this.users ?? []).filter(u => u.id !== userId);
        },
        error: (err) => {
          console.error('Failed to delete user:', err);
        }
      });
    }
  }
// Sort properties-----------------------------------
  onSortChange() {
    this.currentPage = 1; // reset to first page
    this.loadUsers();
  }
// Search properties-----------------------------------
  onSearchChange() {
    this.currentPage = 1;
    this.loadUsers();
  }

  // Pagination properties-------------------------------
  itemsPerPage = 3;
  currentPage = 1;
  totalItems = 10;
  totalPage = 1;

  pageSizeOptions = [3, 6, 10, 20];

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
