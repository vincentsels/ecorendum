import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { EnumsService } from '../../common/enums.service';
import { Proposal, Variant } from '../proposal';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnChanges {
  constructor(public enums: EnumsService, public service: ProposalService) {}

  @Input() proposal?: Proposal;

  selectedAmbitionLevel = 0;
  selectedVariant?: Variant;

  ngOnChanges(changes: SimpleChanges) {
    // const proposal = changes.proposal;
    // if (proposal && proposal.currentValue) {
    //   const currentProposal = (proposal.currentValue as Proposal);
    //   if (currentProposal.variants.length === 1) {
    //     this.selectedVariant = currentProposal.variants[0];
    //   }
    // }
  }

  clearVariant() {
    if (!this.proposal) return;

    this.selectedVariant = undefined;
    this.proposal.selected = false;

    for (let notClickedVariant of this.proposal.variants) {
      notClickedVariant.selected = false;
    }

    this.service.updateResults();
  }

  updateSelected(variant: Variant) {
    if (!this.proposal) return;

    variant.selected = true;

    this.selectedVariant = variant;
    for (let notClickedVariant of this.proposal.variants.filter(v => v.ambitionLevel !== variant.ambitionLevel)) {
      notClickedVariant.selected = false;
    }

    this.proposal.selected = this.proposal.variants.some(v => v.selected);

    this.service.updateResults();
  }
}
