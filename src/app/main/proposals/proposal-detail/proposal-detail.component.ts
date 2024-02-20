import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

import { EnumsService } from '../../../common/enums.service';
import { ImpactDomainType, Variant } from '../proposal';
import { PartyOpinion, ProposalDetail } from '../proposal-details';
import { ProposalService } from '../proposal.service';
import { LanguageService } from '../../../common/language.service';
import { ContextService } from '../../context/context.service';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.scss']
})
export class ProposalDetailComponent implements OnInit {
  private _proposal?: ProposalDetail | undefined;
  public get proposal(): ProposalDetail | undefined {
    return this._proposal;
  }
  @Input()
  public set proposal(value: ProposalDetail | undefined) {
    this._proposal = value;
    this.partyOpinions = (value?.partyOpinions || []).reduce((o, po) => {
      o[po.partyId] = po;
      return o;
    }, {} as any)
  }

  @Input() dialog: boolean = false;
  @Input() set: boolean = false;

  @Output('closeDialog') closeDialogEmitter = new EventEmitter();

  hasDetails = true;
  allParties: boolean = false;
  partyOpinions?: { [id: number]: PartyOpinion };

  constructor(public enums: EnumsService, public service: ProposalService, public languageService: LanguageService,
    public contextService: ContextService,  private route: ActivatedRoute, private snackBar: MatSnackBar,
    private translate: TranslateService, private router: Router) {}

  ngOnInit() {
    if (!this.dialog) {
      this.route.paramMap.subscribe((paramMap) => {
        const idOrSlug = paramMap.get('idorslug');
        const foundProposal = this.service.allProposals.find(p =>
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

  edit() {
    this.closeDialog();
    this.router.navigate(['edit', this.proposal?.slugEn]);
  }

  getVariant = (variantId: number) => this.proposal?.variants.find(v => v.ambitionLevel === variantId);

  closeDialog = () => this.closeDialogEmitter.emit();

  getImpactsOfTypes(variant: Variant, type: ImpactDomainType[]) {
    return variant.impacts.filter(i => type.includes(i.getImpactDomainType()));
  }
}
