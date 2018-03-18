import { Quote } from '../model/quote';

export class LoadQuote {}
export class LikeQuote {}
export class QuoteLoaded {
  constructor(private payload: Quote) {}
}
export class DislikeQuote {
  constructor(private payload: Quote) {}
}
