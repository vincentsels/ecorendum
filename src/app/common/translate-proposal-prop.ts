import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest, from, map, startWith } from 'rxjs';
import { ProposalDetail } from '../main/proposals/proposal-details';
import { Proposal } from '../main/proposals/proposal';

@Pipe({
  name: 'translateProp',
  pure: false,
})
export class TranslateProposalProp implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(proposal?: Proposal | ProposalDetail, propertyName?: TranslatablePropertyType, variantNumber?: number): Observable<string> {
    if (!proposal) return from('');
    if (!propertyName) return from('');

    let translationObservable = null;

    if (propertyName === 'variant.summary' || propertyName === 'variant.title') {
      if (!variantNumber) {
        throw new Error('When specifying a variant property to translate, also specify its number');
      }

      const variantPropertyName = propertyName.split('.')[1];

      translationObservable = this.translateService.get('proposals.' + proposal.slugEn + '.variants.' + variantNumber + '.' + variantPropertyName);
    } else {
      translationObservable = this.translateService.get('proposals.' + proposal.slugEn + '.' + propertyName);
    }

    return combineLatest([
      translationObservable, this.translateService.onLangChange.pipe(startWith(null))])
      .pipe(
        map(([translatedText, _]) => translatedText) // Use only the translated text, ignore the language change event details
      );
  }
}

export type TranslatablePropertyType = 'title' | 'summary' | 'description' | 'variant.title' | 'variant.summary'
