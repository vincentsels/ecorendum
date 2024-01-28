import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { PROPOSAL_SETS_BRUSSELS, PROPOSAL_SETS_FLANDERS, PROPOSAL_SETS_WALLONIA, ProposalSetType } from "../proposals/proposal-data/proposal-sets";
import { PARTIES_BRUSSELS, PARTIES_FLANDERS, PARTIES_WALLONIA, PartyId } from "../party";

const LS_KEY_SELECTED_CONTEXT = 'ecorendum.context';
const DEFAULT_CONTEXT = 'flanders'; // TODO: based on lang/region

export type ContextType = 'flanders' | 'brussels' | 'wallonia';

@Injectable()
export class ContextService {
  context$: BehaviorSubject<ContextType>;

  proposalSets$: Observable<ProposalSetType[]>;
  partyIds$: Observable<PartyId[]>;

  isFlandersContext$: Observable<boolean>;
  isBrusselsContext$: Observable<boolean>;
  isWallonianContext$: Observable<boolean>;

  constructor() {
    this.context$ = new BehaviorSubject<ContextType>(localStorage.getItem(LS_KEY_SELECTED_CONTEXT) as ContextType ?? DEFAULT_CONTEXT);

    this.proposalSets$ = this.context$.pipe(map(c => this.getProposalSetTypesForContext(c)));
    this.partyIds$ = this.context$.pipe(map(c => this.getPartiesForContext(c)));

    this.isFlandersContext$ = this.context$.pipe(map(c => c === 'flanders'));
    this.isBrusselsContext$ = this.context$.pipe(map(c => c === 'brussels'));
    this.isWallonianContext$ = this.context$.pipe(map(c => c === 'wallonia'));
  }

  public setContext(context: ContextType) {
    this.context$.next(context);
    localStorage.setItem(LS_KEY_SELECTED_CONTEXT, context);
  }

  private getProposalSetTypesForContext(context: ContextType) {
    switch (context) {
      case 'flanders': return PROPOSAL_SETS_FLANDERS;
      case 'brussels': return PROPOSAL_SETS_BRUSSELS;
      case 'wallonia': return PROPOSAL_SETS_WALLONIA;
    }
  }

  public getPartiesForContext(context: ContextType) {
    switch (context) {
      case 'flanders': return PARTIES_FLANDERS;
      case 'brussels': return PARTIES_BRUSSELS;
      case 'wallonia': return PARTIES_WALLONIA;
    }
  }
}
