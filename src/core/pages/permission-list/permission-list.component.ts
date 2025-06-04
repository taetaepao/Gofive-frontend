import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Permission } from '../../models/permission.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionService } from '../../services/permission.service';
import { response } from 'express';
import { PermissionUpdateService } from '../../services/permission-update.service';

@Component({
  selector: 'app-permission-list',
  imports: [CommonModule, FormsModule],
  providers: [HttpClient],
  standalone: true, // assuming this is a standalone component
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.css'
})
export class PermissionListComponent  implements OnInit {

  permissions?: Permission[];

  constructor(private permissionService : PermissionService,private permissionUpdateService: PermissionUpdateService) {}

  ngOnInit(): void {
    this.permissionService.getAllPermissions().subscribe({
      next: (response: Permission[]) => {
        this.permissions = response;
        console.log('Permissions loaded:', this.permissions);
      }
    });
  }

  onDelete(permissionId: string): void {
    console.log('Delete permission with ID:', permissionId);
    if (confirm('Are you sure you want to delete this user?')) {
      this.permissionService.deletePermission(permissionId).subscribe({
        next: () => {
          console.log('Permission deleted successfully');
          this.permissionUpdateService.notifyUpdate(); // notify others
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Error deleting permission:', error);
        }
      });
    }
  }

  onSave(permission: Permission): void {
  this.permissionService.updatePermission(permission.id, permission).subscribe({
    next: () => {
      console.log('Permission updated successfully');
      // Optionally reload permissions
      // this.loadPermissions(); 
    },
    error: (err) => {
      console.error('Failed to update permission', err);
    }
  });
}

  showModal = false;

  openModal() {
    console.log('openModal Permission called'); 
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
