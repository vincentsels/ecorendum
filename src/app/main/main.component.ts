import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProposalDetail } from './proposals/proposal-details';
import { ProposalService } from './proposals/proposal.service';
import { ResultsDialogComponent } from './results/results-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ContextService } from './context/context.service';
import { MatRadioChange } from '@angular/material/radio';
import { SelectPartySetDialogComponent } from './select-party-set-dialog/select-party-set-dialog.component';
import { EnumsService } from '../common/enums.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  filteredProposals$?: Observable<ProposalDetail[]>;
  projectsFilter = '';
  proposalsFilter$ = new BehaviorSubject<string>('');
  includeCommitted = true;

  constructor(public proposalService: ProposalService, public contextService: ContextService, public enumsService: EnumsService,
    private dialog: MatDialog, private translate: TranslateService, private route: ActivatedRoute) {
    this.filteredProposals$ = combineLatest([this.proposalsFilter$, this.proposalService.activeProposals$])
      .pipe(
        map(([filter, proposals]) => {
          return proposals.filter(
            p =>
              (this.includeCommitted || !p.committed)
              // && (p.title.some(t => t.text.toLocaleLowerCase().includes(this.projectsFilter.toLocaleLowerCase())) ||
              // p.summary.some(t => t.text.toLocaleLowerCase().includes(this.projectsFilter.toLocaleLowerCase())))
          );
        })
      );

    this.proposalService.updateSelection();

    this.route.params.subscribe(p => {
      const key = p['key'];
      if (key) {
        // TODO: we need error handling here to check for invalid keys
        // TODO: we need to include the region in the key
        this.proposalService.setFromKey(key);
      }
    });
  }

  proposalSetSelectionChanged(event: MatRadioChange) {
    this.proposalService.loadActiveProposalSet({ setType: event.value });
  }

  showResultsDialog() {
    this.dialog.open(ResultsDialogComponent, {
      autoFocus: false,
    });
  }

  showSelectPartyDialog() {
    this.dialog.open(SelectPartySetDialogComponent);
  }

  filterChanged() {
    this.proposalsFilter$.next(this.projectsFilter);
  }

  clearFilter() {
    this.projectsFilter = '';
    this.includeCommitted = true;
    this.filterChanged();
  }

  clearSelection() {
    if (confirm(this.translate.instant('Are you sure you want to erase your selection of measures?'))) {
      this.proposalService.clearSelection();
    }
  }
}
