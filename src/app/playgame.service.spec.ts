/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayGameService } from './playgame.service';

describe('PlayGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayGameService]
    });
  });

  it('should ...', inject([PlayGameService], (service: PlayGameService) => {
    expect(service).toBeTruthy();
  }));
});
