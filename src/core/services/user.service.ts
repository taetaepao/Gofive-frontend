import { Injectable } from '@angular/core';
import { AddUsersRequest } from '../models/add-users-request.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  addUser(model : AddUsersRequest):Observable<void> {
    console.log('Model:', model);
    const apiUrl = 'https://localhost:7216/api/Users';

    return this.http.post<void>(apiUrl, model)
  }
}
