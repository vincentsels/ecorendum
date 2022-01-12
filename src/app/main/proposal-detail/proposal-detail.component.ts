import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EnumsService } from '../../common/enums.service';
import { Proposal, Variant } from '../proposal';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.scss']
})
export class ProposalDetailComponent implements OnChanges, OnInit {
  @Input() proposal?: Proposal;
  @Input() dialog: boolean = false;

  selectedVariant?: Variant;

  constructor(public enums: EnumsService, public service: ProposalService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (!this.dialog) {
      this.route.paramMap.subscribe((paramMap) => {
        const id = Number(paramMap.get('id'));
        this.proposal = this.service.proposals.find(p => p.id === id);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const proposal = changes.proposal;
    if (proposal && proposal.currentValue) {
      const currentProposal = (proposal.currentValue as Proposal);
      this.selectedVariant = currentProposal.getSelectedVariant();
    }
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

  selectProposal() {
    if (!this.proposal) return;
    if (this.proposal.selected) return;
    this.proposal.selectedAmbitionLevel = 1;
    this.updateSelected(this.proposal.variants[0]);
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
