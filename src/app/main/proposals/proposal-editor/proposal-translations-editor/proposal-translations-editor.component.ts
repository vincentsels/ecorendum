import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LanguageType, PolicyLevel, Proposal } from '../../proposal';
import { EnumsService } from '../../../../common/enums.service';
import { ContextService } from '../../../context/context.service';
import { PARTIES_WITH_LOGOS, PartyId } from '../../../party';
import { PartyOpinionsContainerForExport, ProposalTranslationsForExport, TranslationsContainerForExport, VariantTranslationForExport, VariantsContainerForExport } from '../translation-data-for-export';
import { ProposalTranslationsContainer } from '../translation-data';

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
  }

  @Input({ required: true }) data!: ProposalTranslationsContainer;

  constructor(public enums: EnumsService, public contextService: ContextService) {
  }

  partiesForRegion$ = new BehaviorSubject<PartyId[]>([]);

  allLanguages: LanguageType[] = ['en', 'nl', 'fr'];

  copyFromPrevious(lang: LanguageType, index: number) {
    if (!this.data[lang].variants[index]) return;
    if (!this.data[lang].variants[index - 1]) return;

    this.data[lang].variants[index].title = this.data[lang].variants[index - 1].title;
    this.data[lang].variants[index].summary = this.data[lang].variants[index - 1].summary;
  }
}
