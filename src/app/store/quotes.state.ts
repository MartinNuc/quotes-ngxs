import { State, Action, StateContext } from 'ngxs';
import { Quote } from '../model/quote';
import { LoadQuote, LikeQuote, DislikeQuote, QuoteLoaded } from './quotes.actions';

import { tap, map } from 'rxjs/operators';
import { TalaikisQuotesService } from '../talaikis-quotes.service';

export interface QuotesStateModel {
  displayedQuote: Quote;
  favoriteQuotes: Quote[];
  isLoading: boolean;
}

@State<QuotesStateModel>({
  defaults: {
    isLoading: false,
    displayedQuote: null,
    favoriteQuotes: []
  }
})
export class QuotesState {

  constructor(private quotesService: TalaikisQuotesService) {}

  @Action(LoadQuote)
  fetchQuote({state, setState}: StateContext<QuotesStateModel>) {
    setState({
      ...state,
      isLoading: true
    });

    return this.quotesService.fetchQuote().pipe(map(quote => new QuoteLoaded(quote)));
  }

  @Action(QuoteLoaded)
  quoteLoaded({state, setState}: StateContext<QuotesStateModel>, {payload}: QuoteLoaded) {
    setState({
      ...state,
      isLoading: false,
      displayedQuote: payload
    });
  }

  @Action(LikeQuote)
  likeQuote({state, setState}: StateContext<QuotesStateModel>) {
    setState({
      ...state,
      favoriteQuotes: [...state.favoriteQuotes, state.displayedQuote]
    });
  }

  @Action(DislikeQuote)
  dislikeQuote({state, setState}: StateContext<QuotesStateModel>, {payload}: DislikeQuote) {
    setState({
      ...state,
      favoriteQuotes: state.favoriteQuotes.filter(quote => quote !== payload)
    });
  }
}
