import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  getAllPermissions():Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.apiUrl}/Permission`);
  }

  // addPermission(permission: Permission): Observable<Permission> {
  //   return this.http.post<Permission>(`${environment.apiUrl}/Permission`, permission);
  // }

  updatePermission(permissionId: string, permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(`${environment.apiUrl}/Permission/${permissionId}`, permission);
  }

  deletePermission(permissionId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/Permission/${permissionId}`);
  }
}
