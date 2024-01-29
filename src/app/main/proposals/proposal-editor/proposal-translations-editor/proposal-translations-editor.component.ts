import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LanguageType, PolicyLevel, Proposal } from '../../proposal';
import { EnumsService } from '../../../../common/enums.service';
import { PartyOpinionsContainer, ProposalTranslations, TranslationsContainer, TranslationsContainerForExport, VariantTranslations, VariantsContainer } from './translation-data';
import { ContextService } from '../../../context/context.service';
import { PARTIES_WITH_LOGOS, PartyId } from '../../../party';

@Component({
  selector: 'app-proposal-translations-editor',
  templateUrl: './proposal-translations-editor.component.html',
  styleUrls: ['../proposal-editor.component.scss']
})
export class ProposalTranslationsEditorComponent {
  private _proposal: Proposal = new Proposal();

  @Input({ required: true })
  public get proposal(): Proposal {
    return this._proposal;
  }

  public set proposal(value: Proposal) {
    this._proposal = value;

    this.partiesForRegion$.next(
      value.policyLevel === PolicyLevel.brusselian ? this.contextService.getPartiesForContext('brussels')
      : value.policyLevel === PolicyLevel.federal ? PARTIES_WITH_LOGOS
      : value.policyLevel === PolicyLevel.flemish ? this.contextService.getPartiesForContext('flanders')
      : value.policyLevel === PolicyLevel.wallonian ? this.contextService.getPartiesForContext('wallonia')
      : PARTIES_WITH_LOGOS);

    this.data = {
      en: this.generateProposalTranslations(),
      nl: this.generateProposalTranslations(),
      fr: this.generateProposalTranslations(),
    };
  }

  constructor(public enums: EnumsService, public contextService: ContextService) {
  }

  partiesForRegion$ = new BehaviorSubject<PartyId[]>([]);

  allLanguages: LanguageType[] = ['en', 'nl', 'fr'];
  data?: TranslationsContainer;

  generateProposalTranslations(): ProposalTranslations {
    const trans = new ProposalTranslations();

    trans.variants = this._proposal.variants.reduce((o, v) => {
      o[v.ambitionLevel] = new VariantTranslations();
      return o;
    }, {} as VariantsContainer);

    trans.partyOpinions = this.partiesForRegion$.value.reduce((o, partyId) => {
      o[partyId] = '';
      return o;
    }, {} as PartyOpinionsContainer);

    return trans;
  }

  copyFromPrevious(lang: LanguageType, variantId: number) {
    if (!this.data?.[lang]?.variants?.[variantId]) return;

    this.data[lang].variants![variantId].title = this.data[lang].variants![variantId - 1].title;
    this.data[lang].variants![variantId].summary = this.data[lang].variants![variantId - 1].summary;
  }

  exportData() {
    const containerForExport = {
      en: { [this.proposal.slugEn]: this.data!.en, },
      nl: { [this.proposal.slugEn]: this.data!.nl, },
      fr: { [this.proposal.slugEn]: this.data!.fr, }
    } as TranslationsContainerForExport

    return JSON.stringify(containerForExport);
  }
}
