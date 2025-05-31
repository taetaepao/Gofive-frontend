import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Permission } from '../../models/permission.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PermissionService } from '../../services/permission.service';
import { response } from 'express';

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

  constructor(private permissionService : PermissionService) {}

  ngOnInit(): void {
    this.permissionService.getAllPermissions().subscribe({
      next: (response: Permission[]) => {
        this.permissions = response;
        console.log('Permissions loaded:', this.permissions);
      }
    });
  }

  // Optional: Method to save updates (when you build the POST or PUT API)
  // savePermissions(): void {
  //   this.http.post('https://localhost:7216/api/permissions/update', this.permissions)
  //     .subscribe({
  //       next: () => alert('Permissions updated successfully!'),
  //       error: (err) => console.error('Failed to update permissions:', err)
  //     });
  // }

  showModal = false;

  openModal() {
    console.log('openModal Permission called'); 
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
