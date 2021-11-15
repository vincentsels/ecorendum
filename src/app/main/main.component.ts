import { Component } from '@angular/core';

import { Proposal } from './proposal';
import { ProposalService } from './proposal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  proposals: Proposal[] = [];

  constructor(public proposalService: ProposalService) {}

  ngOnInit(): void {
    this.proposals = this.proposalService.getProposals();
  }
}
