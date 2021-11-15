import { Component, Input, OnInit } from '@angular/core';
import { Proposal } from '../proposal';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent {
  @Input() proposal?: Proposal;
}
