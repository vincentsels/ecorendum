import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';
import { ProposalDetail } from '../main/proposal-details';
import { Proposal } from '../main/proposal';

@Pipe({ name: 'translateProp' })
export class TranslateProposalProp implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(proposal: Proposal | ProposalDetail, propertyName: TranslatableProperty): Observable<string> {
    if (!proposal) return from('');

    return this.translateService.get('proposals.' + proposal.slugEn + '.' + propertyName);
  }
}

export type TranslatableProperty = 'title' | 'summary' | 'description'
