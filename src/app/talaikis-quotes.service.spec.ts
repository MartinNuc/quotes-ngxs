import { TestBed, inject } from '@angular/core/testing';

import { TalaikisQuotesService } from './talaikis-quotes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('TalaikisQuotesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TalaikisQuotesService],
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('it should load quote', inject([TalaikisQuotesService], (service: TalaikisQuotesService) => {
    const quote = {
      quote: `Marriage is a bribe to make the housekeeper think she's a householder.`,
      author: `Thornton Wilder`,
      cat: `marriage`
    };
    service.fetchQuote().subscribe(response => {
      expect(response).toEqual({
        text: `Marriage is a bribe to make the housekeeper think she's a householder.`,
        author: `Thornton Wilder`
      });
    });
    const req = httpTestingController.expectOne('https://talaikis.com/api/quotes/random/');
    expect(req.request.method).toEqual('GET');
    req.flush(quote);
    httpTestingController.verify(); // verify there are no pending requests
  }));
});
