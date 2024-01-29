import { PartyId } from "../../party";
import { LanguageType } from "../proposal";

export class ProposalTranslationsContainer {
  en = new ProposalTranslations('en');
  nl = new ProposalTranslations('nl');
  fr = new ProposalTranslations('fr');

  addVariant(id: number) {
    this.en.variants.push(new VariantTranslation(id));
    this.nl.variants.push(new VariantTranslation(id));
    this.fr.variants.push(new VariantTranslation(id));
  }
  removeVariant(id: number) {
    this.en.variants = this.en.variants.filter(v => v.variantId !== id);
    this.nl.variants = this.nl.variants.filter(v => v.variantId !== id);
    this.fr.variants = this.fr.variants.filter(v => v.variantId !== id);
  }
}

export class ProposalTranslations {
  constructor(public language: LanguageType) {}
  title: string = '';
  summary: string = '';
  variants: VariantTranslation[] = [];
  partyOpinions: PartyOpinionTranslation[] = [];
}


export class VariantTranslation {
  constructor(public variantId: number) {}

  title?: string = '';
  summary?: string;
}

export class PartyOpinionTranslation {
  constructor (public partyId: PartyId) {}

  opinion?: string;
}
