import { Injectable } from '@angular/core';
import { AddUsersRequest } from '../models/add-users-request.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  addUser(model : AddUsersRequest):Observable<void> {
    console.log('Model:', model);
    return this.http.post<void>(`${environment.apiUrl}/Users`, model)
  }

  getAllUsers():Observable<Users[]> {
      return this.http.get<Users[]>(`${environment.apiUrl}/Users`);
  }
  
  getUserById(id: string): Observable<Users> {
    return this.http.get<Users>(`${environment.apiUrl}/Users/${id}`);
  }

  updateUser(id: string, userData: any): Observable<any> {
  return this.http.post(`${environment.apiUrl}/Users/${id}`, userData);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/Users/${id}`);
  }

  getPagedUsers(page: number, pageSize: number, sortBy : string, search: string): Observable<{ totalcount:number ,users:Users[]}> {
  return this.http.get<{totalcount:number, users:Users[]}>(
    `${environment.apiUrl}/Users/Pages?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&search=${encodeURIComponent(search)}`);
  }
}
