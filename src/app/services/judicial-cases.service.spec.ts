import { TestBed } from '@angular/core/testing';

import { JudicialCasesService } from './judicial-cases.service';

describe('JudicialCasesService', () => {
  let service: JudicialCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JudicialCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
