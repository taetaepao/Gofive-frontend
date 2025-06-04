import { TestBed } from '@angular/core/testing';

import { PermissionUpdateService } from './permission-update.service';

describe('PermissionUpdateService', () => {
  let service: PermissionUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
