import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule, ReduxDevtoolsPluginModule } from 'ngxs';

import { AppComponent } from './app.component';
import { RandomQuoteComponent } from './random-quote/random-quote.component';
import { FavoriteQuoteListComponent } from './favorite-quote-list/favorite-quote-list.component';
import { QuotesState } from './store/quotes.state';
import { TalaikisQuotesService } from './talaikis-quotes.service';


@NgModule({
  declarations: [
    AppComponent,
    RandomQuoteComponent,
    FavoriteQuoteListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([
      QuotesState
    ]),
    ReduxDevtoolsPluginModule.forRoot({
      disabled: false
    })
  ],
  providers: [TalaikisQuotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
