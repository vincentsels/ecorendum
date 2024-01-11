import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";

const LS_KEY_SELECTED_CONTEXT = 'ecorendum.context';

export type Context = 'flanders' | 'brussels' | 'wallonia';

@Injectable()
export class ContextService {
  context$ = new BehaviorSubject<Context>(localStorage.getItem(LS_KEY_SELECTED_CONTEXT) as Context ?? 'flanders');

  isFlandersContext$ = this.context$.pipe(map(c => c === 'flanders'));
  isBrusselsContext$ = this.context$.pipe(map(c => c === 'brussels'));
  isWallonianContext$ = this.context$.pipe(map(c => c === 'wallonia'));


  public setContext(context: Context) {
    this.context$.next(context);
    localStorage.setItem(LS_KEY_SELECTED_CONTEXT, context);
  }
}
