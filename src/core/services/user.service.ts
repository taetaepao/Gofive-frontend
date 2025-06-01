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
}
