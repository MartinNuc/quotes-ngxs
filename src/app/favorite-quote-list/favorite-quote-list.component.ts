import { Component, OnInit } from '@angular/core';
import { Store } from 'ngxs';
import { Quote } from '../model/quote';
import { Observable } from 'rxjs/Observable';
import { Select } from 'ngxs';
import { DislikeQuote } from '../store/quotes.actions';

@Component({
  selector: 'app-favorite-quote-list',
  templateUrl: './favorite-quote-list.component.html',
  styleUrls: ['./favorite-quote-list.component.css']
})
export class FavoriteQuoteListComponent implements OnInit {

  @Select('quotes.favoriteQuotes')
  favoriteQuotes$: Observable<Quote[]>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  remove(quote: Quote) {
    this.store.dispatch(new DislikeQuote(quote));
  }
}
