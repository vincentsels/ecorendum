import { Component, Input } from '@angular/core';

import { LanguageType, Proposal } from '../../proposal';
import { EnumsService } from '../../../../common/enums.service';
import { ProposalTranslations, TranslationsContainer, TranslationsContainerForExport, VariantTranslations, VariantsContainer } from './translation-data';

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
    this.data = {
      en: this.generateProposalTranslations(),
      nl: this.generateProposalTranslations(),
      fr: this.generateProposalTranslations(),
    };
  }

  constructor(public enums: EnumsService) {
  }

  allLanguages: LanguageType[] = ['en', 'nl', 'fr'];
  data?: TranslationsContainer;

  generateProposalTranslations(): ProposalTranslations {
    const trans = new ProposalTranslations();
    trans.variants = this._proposal.variants.reduce((o, v) => {
      o[v.ambitionLevel] = new VariantTranslations();
      return o;
    }, {} as VariantsContainer)

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
