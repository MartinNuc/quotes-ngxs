import { Page } from '../po';
import { RandomQuoteComponent } from './random-quote.component';

export class RandomQuotePageObject extends Page<RandomQuoteComponent> {
  get text() { return this.query<HTMLParagraphElement>('p'); }
  get author() { return this.query<HTMLHeadingElement>('h1'); }
  get like() { return this.query<HTMLButtonElement>('.like-button'); }
  get dislike() { return this.query<HTMLButtonElement>('.dislike-button'); }
  get nextQuote() { return this.query<HTMLButtonElement>('.next-quote'); }
  get loading() { return this.query<HTMLDivElement>('.loading'); }
}
