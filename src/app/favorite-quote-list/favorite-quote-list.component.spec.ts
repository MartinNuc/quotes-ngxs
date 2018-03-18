import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FavoriteQuoteListComponent } from './favorite-quote-list.component';
import { QuotesState } from '../store/quotes.state';
import { NgxsModule } from 'ngxs';
import { Store } from 'ngxs';

import { of } from 'rxjs/observable/of';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FavoriteQuotePageObject } from './favorite-quote-list.po';
import { LikeQuote, LoadQuote, QuoteLoaded } from '../store/quotes.actions';
import { TalaikisQuotesService } from '../talaikis-quotes.service';

describe('FavoriteQuoteListComponent', () => {
  let component: FavoriteQuoteListComponent;
  let fixture: ComponentFixture<FavoriteQuoteListComponent>;
  let store: Store;
  let page: FavoriteQuotePageObject;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteQuoteListComponent ],
      imports: [NgxsModule.forRoot([QuotesState]), HttpClientTestingModule],
      providers: [{provide: TalaikisQuotesService, useValue: {} }]
    })
    .compileComponents();
    store = TestBed.get(Store);
    store.dispatch(new QuoteLoaded({
      text: 'This is the best quote ever',
      author: 'Martin Nuc'
    }));
    store.dispatch(new LikeQuote());
    store.dispatch(new QuoteLoaded({
      text: 'Another Quote',
      author: 'Albert Einstein'
    }));
    store.dispatch(new LikeQuote());
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteQuoteListComponent);
    component = fixture.componentInstance;
    page = new FavoriteQuotePageObject(fixture);
    fixture.detectChanges();
  });

  it('should display favorite quotes', () => {
    expect(page.quotes.length).toBe(2);
    expect(page.texts[0].textContent).toBe('This is the best quote ever');
    expect(page.texts[1].textContent).toBe('Another Quote');
  });

  it('should remove disliked quote', () => {
    expect(page.quotes.length).toBe(2);
    page.removeButtons[0].click();
    fixture.detectChanges();
    expect(page.quotes.length).toBe(1);
    expect(page.texts[0].textContent).toBe('Another Quote');
  });
});
