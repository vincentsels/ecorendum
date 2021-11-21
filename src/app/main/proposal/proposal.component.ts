import { Component, Input } from '@angular/core';

import { EnumsService } from '../../common/enums.service';
import { Proposal, Variant } from '../proposal';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent {
  constructor(public enums: EnumsService, public service: ProposalService) {}

  @Input() proposal?: Proposal;

  updateSelected(variant: Variant) {
    if (!this.proposal) return;

    variant.selected = !variant.selected;

    if (variant.selected) {
      for (let notClickedVariant of this.proposal.variants.filter(v => v.ambitionLevel !== variant.ambitionLevel)) {
        notClickedVariant.selected = false;
      }
    }

    this.proposal.selected = this.proposal.variants.some(v => v.selected);

    this.service.updateResults();
  }
}
