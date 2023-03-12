import { TestBed } from '@angular/core/testing';

import { ElectricityUserService } from './electricity-user.service';

describe('ElectricityUserService', () => {
  let service: ElectricityUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectricityUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
