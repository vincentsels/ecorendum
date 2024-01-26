import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { EnumsService } from '../../../common/enums.service';
import { PARTIES_WITH_LOGOS } from '../../party';
import { Variant } from '../proposal';
import { ProposalDetail } from '../proposal-details';
import { ProposalService } from '../proposal.service';
import { LanguageService } from '../../../common/language.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.scss']
})
export class ProposalDetailComponent implements OnInit {
  @Input() proposal?: ProposalDetail;
  @Input() dialog: boolean = false;

  @Output('closeDialog') closeDialogEmitter = new EventEmitter();

  hasDetails = true;
  allParties: boolean = false;

  constructor(public enums: EnumsService, public service: ProposalService, public languageService: LanguageService,
    private route: ActivatedRoute, private snackBar: MatSnackBar, private translate: TranslateService) {}

  ngOnInit() {
    if (!this.dialog) {
      this.route.paramMap.subscribe((paramMap) => {
        const idOrSlug = paramMap.get('idorslug');
        const foundProposal = this.service.activeProposals$.value.find(p =>
          (!isNaN(Number(idOrSlug)) && p.id === Number(idOrSlug)) ||
          (p.slugNl === idOrSlug || p.slugFr === idOrSlug ||p.slugEn === idOrSlug));
        if (foundProposal) this.proposal = new ProposalDetail(foundProposal);
      });
    }
  }

  errorLoadingMarkdown(evt: any) {
    if (evt instanceof HttpErrorResponse && evt.status === 404) {
      this.hasDetails = false;
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

  contribute() {
    this.snackBar.open(this.translate.instant(
      'This would direct to a separate website, where any registered Belgian citizen can contribute and, with a sufficiently high reputation or credentials, moderate.'), 'OK');
  }

  getVariant = (variantId: number) => this.proposal?.variants.find(v => v.ambitionLevel === variantId);

  closeDialog = () => this.closeDialogEmitter.emit();

  getOpinions = () => this.allParties
    ? this.proposal?.partyOpinions
    : this.proposal?.partyOpinions?.filter(p => PARTIES_WITH_LOGOS.includes(p.partyId))
}
