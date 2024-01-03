import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, combineLatest, from, map, startWith } from 'rxjs';
import { ProposalDetail } from '../main/proposal-details';
import { Proposal } from '../main/proposal';

@Pipe({
  name: 'translateProp',
  pure: false,
})
export class TranslateProposalProp implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(proposal: Proposal | ProposalDetail, propertyName: TranslatableProperty): Observable<string> {
    if (!proposal) return from('');

    const translationObservable = this.translateService.get('proposals.' + proposal.slugEn + '.' + propertyName);

    return combineLatest([
      translationObservable, this.translateService.onLangChange.pipe(startWith(null))])
      .pipe(
        map(([translatedText, _]) => translatedText) // Use only the translated text, ignore the language change event details
      );
  }
}

export type TranslatableProperty = 'title' | 'summary' | 'description'
