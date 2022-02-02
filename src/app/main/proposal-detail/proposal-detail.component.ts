import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EnumsService } from '../../common/enums.service';
import { Proposal, Variant } from '../proposal';
import { ProposalDetail } from '../proposal-details';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.scss']
})
export class ProposalDetailComponent implements OnChanges, OnInit {
  @Input() proposal?: ProposalDetail;
  @Input() dialog: boolean = false;

  @Output('closeDialog') closeDialogEmitter = new EventEmitter();

  selectedVariant?: Variant;

  constructor(public enums: EnumsService, public service: ProposalService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (!this.dialog) {
      this.route.paramMap.subscribe((paramMap) => {
        const idOrSlug = paramMap.get('idorslug');
        const foundProposal = this.service.proposals.find(p =>
          (!isNaN(Number(idOrSlug)) && p.id === Number(idOrSlug)) ||
          p.slug.some(s => s.text === idOrSlug));
        if (foundProposal) this.proposal = new ProposalDetail(foundProposal);
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

  updateSelected(variant: Variant) {
    if (!this.proposal) return;
    this.service.updateSelectedVariant(this.proposal, variant);
    this.service.updateResults();
  }

  closeDialog = () => this.closeDialogEmitter.emit();
}
