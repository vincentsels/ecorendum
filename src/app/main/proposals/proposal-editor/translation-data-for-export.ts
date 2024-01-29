import { PartyId } from "../../party";
import { LanguageType } from "../proposal";

export class ProposalTranslationsForExport {
  title: string = '';
  summary: string = '';
  variants?: VariantsContainerForExport;
  partyOpinions?: PartyOpinionsContainerForExport;
}

export class VariantTranslationForExport {
  title: string = '';
  summary?: string;
}

export type VariantsContainerForExport = { [id: number]: VariantTranslationForExport };
export type PartyOpinionsContainerForExport = { [id in PartyId]: string };
export type TranslationsContainerForExport = { [lang in LanguageType]: { [slug: string]: ProposalTranslationsForExport } };
export type TranslationsContainer = { [lang in LanguageType]: ProposalTranslationsForExport };
