import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionUpdateService {

  constructor() { }

  private updateSubject = new Subject<void>();
  update$ = this.updateSubject.asObservable();

  notifyUpdate() {
    this.updateSubject.next();
  }
}
