import { ReplaySubject } from 'rxjs';

export class UnsubscribeSubject extends ReplaySubject<boolean> {
  constructor() {
    super();
  }

  destroy() {
    this.next(true);
    this.complete();
  }
}
