import { FavoriteQuoteListComponent } from './favorite-quote-list.component';
import { Page } from '../po';

export class FavoriteQuotePageObject extends Page<FavoriteQuoteListComponent> {
  get quotes() { return this.queryAll<HTMLElement>('li'); }
  get removeButtons() { return this.queryAll<HTMLButtonElement>('button'); }
  get texts() { return this.queryAll<HTMLSpanElement>('.text'); }
}
