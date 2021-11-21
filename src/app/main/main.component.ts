import { Component } from '@angular/core';

import { ProposalService } from './proposal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(public proposalService: ProposalService) {}
}
