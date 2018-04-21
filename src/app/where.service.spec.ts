import { TestBed, inject } from '@angular/core/testing';

import { WhereService } from './where.service';

describe('WhereService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WhereService]
    });
  });

  it('should be created', inject([WhereService], (service: WhereService) => {
    expect(service).toBeTruthy();
  }));
});
