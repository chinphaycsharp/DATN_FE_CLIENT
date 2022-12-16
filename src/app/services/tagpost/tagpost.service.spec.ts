import { TestBed } from '@angular/core/testing';

import { TagpostService } from './tagpost.service';

describe('TagpostService', () => {
  let service: TagpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
