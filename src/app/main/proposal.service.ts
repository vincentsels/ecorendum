import { Injectable } from '@angular/core';
import { PROPOSALS } from './dummyProposals';
import { Proposal } from './proposal';

@Injectable()
export class ProposalService {
  constructor() { }

  getProposals(): Proposal[] {
    return PROPOSALS;
  }
}
