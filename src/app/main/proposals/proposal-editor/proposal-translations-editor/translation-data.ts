import { LanguageType } from "../../proposal";

export class ProposalTranslations {
  title: string = '';
  summary: string = '';
  variants?: VariantsContainer;
}

export class VariantTranslations {
  title: string = '';
  summary?: string;
}

export type VariantsContainer = { [id: number]: VariantTranslations };

export type TranslationsContainer = { [lang in LanguageType]: ProposalTranslations };

export type TranslationsContainerForExport = { [lang in LanguageType]: { [slug: string]: ProposalTranslations } };
