import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  getAllPermissions():Observable<Permission[]> {
    return this.http.get<Permission[]>('https://localhost:7216/api/Permission');
  }
}
