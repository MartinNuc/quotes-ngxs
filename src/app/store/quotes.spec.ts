import { Store, NgxsModule } from 'ngxs';
import { async, TestBed } from '@angular/core/testing';
import { QuotesState, QuotesStateModel } from './quotes.state';
import { LoadQuote, QuoteLoaded, LikeQuote, DislikeQuote } from './quotes.actions';
import { TalaikisQuotesService } from '../talaikis-quotes.service';
import { of } from 'rxjs/observable/of';

class QuoteServiceMock {
  fetchQuote() {}
}

describe('Quotes Store', () => {
  let store: Store;
  let quoteService: TalaikisQuotesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([QuotesState])],
      providers: [{ provide: TalaikisQuotesService, useClass: QuoteServiceMock }]
    }).compileComponents();
    store = TestBed.get(Store);
    quoteService = TestBed.get(TalaikisQuotesService);
  }));

  it('should display isLoading after dispatching LoadQuote', () => {
    spyOn(quoteService, 'fetchQuote').and.returnValue(of());

    store.dispatch(new LoadQuote());
    store.select(state => state.quotes).subscribe((state: QuotesStateModel) => {
      expect(state.isLoading).toBe(true);
    });
  });

  it('should set displayed quote and isLoading after quote is loaded', () => {
    store.dispatch(new QuoteLoaded({
      author: 'Martin Nuc',
      text: 'The best quote ever.'
    }));
    store.select(state => state.quotes).subscribe((state: QuotesStateModel) => {
      expect(state.displayedQuote.author).toBe('Martin Nuc');
      expect(state.displayedQuote.text).toBe('The best quote ever.');
      expect(state.isLoading).toBe(false);
    });
  });

  it('should add quote to favorite quotes array after liking it', () => {
    store.dispatch(new QuoteLoaded({
      author: 'Martin Nuc',
      text: 'The best quote ever.'
    }));
    store.dispatch(new LikeQuote());
    store.select(state => state.quotes).subscribe((state: QuotesStateModel) => {
      expect(state.displayedQuote.author).toBe('Martin Nuc');
      expect(state.favoriteQuotes.length).toBe(1);
      expect(state.favoriteQuotes[0].author).toBe('Martin Nuc');
      expect(state.isLoading).toBe(false);
    });
  });

  it('should remove quote from favorite quotes array after dislike', () => {
    const quote = {
      author: 'Martin Nuc',
      text: 'The best quote ever.'
    };
    store.dispatch(new QuoteLoaded(quote));
    store.dispatch(new LikeQuote());
    store.dispatch(new DislikeQuote(quote));

    store.select(state => state.quotes).subscribe((state: QuotesStateModel) => {
      expect(state.favoriteQuotes.length).toBe(0);
    });
  });

});
