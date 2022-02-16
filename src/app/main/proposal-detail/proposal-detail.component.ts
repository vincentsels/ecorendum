import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EnumsService } from '../../common/enums.service';
import { PARTIES_WITH_LOGOS } from '../party';
import { Proposal, Variant } from '../proposal';
import { ProposalDetail } from '../proposal-details';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.scss']
})
export class ProposalDetailComponent implements OnInit {
  @Input() proposal?: ProposalDetail;
  @Input() dialog: boolean = false;

  @Output('closeDialog') closeDialogEmitter = new EventEmitter();

  allParties: boolean = false;

  constructor(public enums: EnumsService, public service: ProposalService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (!this.dialog) {
      this.route.paramMap.subscribe((paramMap) => {
        const idOrSlug = paramMap.get('idorslug');
        const foundProposal = this.service.proposals$.value.find(p =>
          (!isNaN(Number(idOrSlug)) && p.id === Number(idOrSlug)) ||
          p.slug.some(s => s.text === idOrSlug));
        if (foundProposal) this.proposal = new ProposalDetail(foundProposal);
      });
    }
  }

  updateSelected(variant: Variant) {
    if (!this.proposal) return;
    if (!variant.selected) {
      this.service.selectVariant(this.proposal, variant);
    } else {
      this.service.clearVariant(this.proposal);
    }
  }

  getVariant = (variantId: number) => this.proposal?.variants.find(v => v.ambitionLevel === variantId);

  closeDialog = () => this.closeDialogEmitter.emit();

  getOpinions = () => this.allParties
    ? this.proposal?.partyOpinions
    : this.proposal?.partyOpinions?.filter(p => PARTIES_WITH_LOGOS.includes(p.partyId))
}
