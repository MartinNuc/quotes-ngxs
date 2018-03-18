import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomQuoteComponent } from './random-quote.component';
import { NgxsModule, Store } from 'ngxs';
import { QuotesState } from '../store/quotes.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TalaikisQuotesService } from '../talaikis-quotes.service';
import { RandomQuotePageObject } from './random-quote.po';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { QuoteLoaded, LikeQuote } from '../store/quotes.actions';

describe('RandomQuoteComponent', () => {
  let component: RandomQuoteComponent;
  let fixture: ComponentFixture<RandomQuoteComponent>;
  let page: RandomQuotePageObject;
  let store: Store;
  let quotesService: TalaikisQuotesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomQuoteComponent ],
      imports: [NgxsModule.forRoot([QuotesState]), HttpClientTestingModule],
      providers: [{provide: TalaikisQuotesService, useValue: {
        fetchQuote() {}
      } }]
    })
    .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomQuoteComponent);
    component = fixture.componentInstance;
    quotesService = fixture.debugElement.injector.get(TalaikisQuotesService);
    page = new RandomQuotePageObject(fixture);

    spyOn(quotesService, 'fetchQuote').and.returnValue(of({
      text: 'This is the best quote ever',
      author: 'Martin Nuc'
    }));
  });

  it('should display Loading until quote is loaded', () => {
    expect(page.loading).toBeDefined();
    fixture.detectChanges();
    expect(page.loading).toBeNull();
    expect(page.author.textContent).toBe('Martin Nuc');
    expect(page.text.textContent).toBe('This is the best quote ever');
  });

  it('should remove quote from favorites quote array when dislike button clicked', () => {
    fixture.detectChanges();
    store.dispatch(new LikeQuote());
    fixture.detectChanges();
    expect(page.dislike).toBeDefined();
    expect(page.like).toBeNull();
    page.dislike.click();
    fixture.detectChanges();
    expect(page.dislike).toBeNull();
    expect(page.like).toBeDefined();
  });
});
