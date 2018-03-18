import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { QuoteLoaded } from './store/quotes.actions';
import { Quote } from './model/quote';
import { Observable } from 'rxjs/Observable';

interface TalaikisResponse {
  quote: string;
  author: string;
}

@Injectable()
export class TalaikisQuotesService {

  constructor(private http: HttpClient) {}

  fetchQuote(): Observable<Quote> {
    const url = 'https://talaikis.com/api/quotes/random/';
    return this.http.get<TalaikisResponse>(url)
      .pipe(
        map(quote => ({
          text: quote.quote,
          author: quote.author
        }))
      );
  }

}
