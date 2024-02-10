import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, first, forkJoin, withLatestFrom } from 'rxjs';

import { LanguageType, PolicyLevel, Proposal, Variant } from '../proposal';
import { EnumsService } from '../../../common/enums.service';
import { ProposalService } from '../proposal.service';
import { ProposalDetail } from '../proposal-details';
import { PROPOSALS_FEDERAL } from '../proposal-data/proposals-federal';
import { PROPOSALS_FLANDERS } from '../proposal-data/proposals-flanders';
import { ContextType } from '../../context/context.service';
import { PROPOSALS_BRUSSELS } from '../proposal-data/proposals-brussels';
import { PROPOSALS_WALLONIA } from '../proposal-data/proposals-wallonia';
import { ProposalTranslationsEditorComponent } from './proposal-translations-editor/proposal-translations-editor.component';
import { ProposalTranslations, ProposalTranslationsContainer, VariantTranslation } from './translation-data';
import { ProposalTranslationsForExport, TranslationsContainerForExport, VariantTranslationForExport, VariantsContainerForExport } from './translation-data-for-export';

type AllRegionsType = ContextType | 'federal';

@Component({
  selector: 'app-proposal-editor',
  templateUrl: './proposal-editor.component.html',
  styleUrls: ['./proposal-editor.component.scss']
})
export class ProposalEditorComponent implements OnInit {
  proposal = new Proposal();
  translationData = new ProposalTranslationsContainer();

  en: any;
  nl: any;
  fr: any;

  translationsLoaded$!: Observable<any>;

  allRegions: AllRegionsType[] = ['federal', 'flanders', 'brussels', 'wallonia'];

  allProposals: { [policyLevel in AllRegionsType]: ProposalDetail[] };

  @ViewChild('translationsEditor') translationsEditor?: ProposalTranslationsEditorComponent;

  // Initialize with a default variant
  constructor(public enums: EnumsService, public proposalService: ProposalService,
    private route: ActivatedRoute, private translate: TranslateService) {
    this.allProposals = {
      federal: [...PROPOSALS_FEDERAL],
      flanders: [...PROPOSALS_FLANDERS],
      brussels: [...PROPOSALS_BRUSSELS],
      wallonia: [...PROPOSALS_WALLONIA],
    }

    this.createNewProposal();
  }

  private createNewProposal() {
    this.proposal = new Proposal();
    const variant = new Variant();
    variant.proposal = this.proposal;
    this.proposal.variants.push(variant);
    this.translationData.addVariant(variant.ambitionLevel);
  }

  private preloadTranslations() {
    // This seems to actually change the language; so we need to store the current language and reset it
    const currLang = this.translate.currentLang;

    const enTranslations$ = this.translate.getTranslation('en').pipe(first());
    const nlTranslations$ = this.translate.getTranslation('nl').pipe(first());
    const frTranslations$ = this.translate.getTranslation('fr').pipe(first());

    this.translationsLoaded$ = forkJoin([enTranslations$, nlTranslations$, frTranslations$]);

    this.translationsLoaded$.pipe(first()).subscribe(
      ([en, nl, fr]) => {
        this.en = en;
        this.nl = nl;
        this.fr = fr;
      }
    );

    this.translate.getTranslation(currLang);
  }

  ngOnInit() {
    this.preloadTranslations();

    this.translationsLoaded$.pipe(withLatestFrom(this.route.paramMap)).subscribe(([_, paramMap]) => {
      const idOrSlug = paramMap.get('idorslug');
      const foundProposal = this.proposalService.allProposals.find(p =>
        (!isNaN(Number(idOrSlug)) && p.id === Number(idOrSlug)) ||
        (p.slugNl === idOrSlug || p.slugFr === idOrSlug ||p.slugEn === idOrSlug));
      if (foundProposal) {
        this.load(foundProposal);
      }
    });
  }

  load(selectedProposal: ProposalDetail) {
    // Really don't know why I have to do this; but otherwise some comboboxes aren't translated :(
    setTimeout(() => {
      this.proposal = selectedProposal;
      this.fillTranslations();
    });
  }

  private fillTranslations() {
    this.translationData = new ProposalTranslationsContainer();
    this.fillTranslationsForLang(this.translationData.en, this.en.proposals[this.proposal.slugEn], this.en.proposals[this.proposal.slugEn]);
    this.fillTranslationsForLang(this.translationData.nl, this.nl.proposals[this.proposal.slugEn], this.en.proposals[this.proposal.slugEn]);
    this.fillTranslationsForLang(this.translationData.fr, this.fr.proposals[this.proposal.slugEn], this.en.proposals[this.proposal.slugEn]);
  }

  private fillTranslationsForLang(proposalTrans: ProposalTranslations, translations: any, bckTranslations: any) {
    proposalTrans.title = translations?.title || bckTranslations.title;
    proposalTrans.summary = translations?.summary || bckTranslations.summary;

    for (let variant of this.proposal.variants) {
      const id = variant.ambitionLevel;
      const v = new VariantTranslation(id);
      v.summary = translations?.variants?.[id]?.summary || bckTranslations?.variants?.[id]?.summary;
      v.title = translations?.variants?.[id]?.title || bckTranslations?.variants?.[id]?.title;
      proposalTrans.variants.push(v);
    }
  }

  clone() {
    this.proposal = new ProposalDetail(this.proposal);
    if (this.proposal.policyLevel === PolicyLevel.federal) {
      this.proposal.id = Math.max(...PROPOSALS_FEDERAL.map(p => p.id)) + 1;
    } else if (this.proposal.policyLevel === PolicyLevel.flemish) {
      this.proposal.id = Math.max(...PROPOSALS_FLANDERS.map(p => p.id)) + 1;
    } else if (this.proposal.policyLevel === PolicyLevel.brussels) {
      this.proposal.id = Math.max(...PROPOSALS_BRUSSELS.map(p => p.id)) + 1;
    } else if (this.proposal.policyLevel === PolicyLevel.wallonian) {
      this.proposal.id = Math.max(...PROPOSALS_WALLONIA.map(p => p.id)) + 1;
    } else throw new Error('Unknown policy level');
  }

  getTranslationData() {
    const en = this.getTranslationDataForLang('en');
    const nl = this.getTranslationDataForLang('nl');
    const fr = this.getTranslationDataForLang('fr');

    const containerForExport = { en, nl, fr } as TranslationsContainerForExport

    return JSON.stringify(containerForExport);
  }

  private getTranslationDataForLang(lang: LanguageType) {
    return {
      [this.proposal.slugEn]: {
        summary: this.translationData[lang].summary,
        title: this.translationData[lang].title,
        variants: this.translationData[lang].variants.reduce((o, v) => {
          o[v.variantId] = { title: v.title, summary: v.summary } as VariantTranslationForExport;
          return o;
        }, {} as VariantsContainerForExport)
      } as ProposalTranslationsForExport
    };
  }

  download() {
    const serialized = this.proposal.serialize(false);
    const fileName = this.proposal.id + '-' + this.proposal.slugEn + '.json';
    this.downloadFile(serialized, fileName);

    if (this.translationsEditor) {
      const translationsSerialized = this.getTranslationData();
      const translationsFileName = this.proposal.id + '-' + this.proposal.slugEn + '-translations.json';
      this.downloadFile(translationsSerialized, translationsFileName);
    }
  }

  private downloadFile(data: string, fileName: string): void {
    // Step 1: Convert string to Blob
    const blob = new Blob([data], { type: 'application/json' });

    // Step 2: Create Blob URL
    const url = window.URL.createObjectURL(blob);

    // Step 3: Create a new anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    // Append anchor to the body
    document.body.appendChild(a);

    // Step 4: Trigger the download
    a.click();

    // Step 5: Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
