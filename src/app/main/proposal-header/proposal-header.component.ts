import { Component, Input } from '@angular/core';

import { EnumsService } from '../../common/enums.service';
import { Proposal } from '../proposal';

@Component({
  selector: 'app-proposal-header',
  templateUrl: './proposal-header.component.html',
  styleUrls: ['./proposal-header.component.scss']
})
export class ProposalHeaderComponent {
  @Input() proposal?: Proposal;
  @Input() card: boolean = false;

  constructor(public enums: EnumsService) {}
}
