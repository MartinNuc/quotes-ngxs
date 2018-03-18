import { Component, OnInit } from '@angular/core';
import { Store } from 'ngxs';
import { Select } from 'ngxs';
import { Observable } from 'rxjs/Observable';
import { Quote } from '../model/quote';
import { LoadQuote, LikeQuote, DislikeQuote } from '../store/quotes.actions';
import { map, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-random-quote',
  templateUrl: './random-quote.component.html',
  styleUrls: ['./random-quote.component.css']
})
export class RandomQuoteComponent implements OnInit {

  @Select('quotes.isLoading')
  loading$: Observable<boolean>;
  @Select('quotes.displayedQuote')
  displayedQuote$: Observable<Quote>;

  alreadyLiked$: Observable<boolean>;

  favoriteQuotesCount$: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.alreadyLiked$ = combineLatest(this.displayedQuote$, this.store.select(state => state.quotes.favoriteQuotes))
    .pipe(
      map(([displayedQuote, favoriteQuotes]) => favoriteQuotes.some(quote => quote === displayedQuote))
    );
    this.favoriteQuotesCount$ = this.store.select(state => state.quotes.favoriteQuotes)
      .pipe(map(quotes => quotes.length));
    this.loadNextQuote();
  }

  like() {
    this.store.dispatch(new LikeQuote());
  }

  loadNextQuote() {
    this.store.dispatch(new LoadQuote());
  }

  dislike() {
    this.store.selectOnce(state => state.quotes.displayedQuote).subscribe(currentQuote => {
      this.store.dispatch(new DislikeQuote(currentQuote));
    });
  }
}
