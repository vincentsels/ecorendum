import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProposalDetail } from './proposals/proposal-details';
import { ProposalService } from './proposals/proposal.service';
import { ResultsDialogComponent } from './results/results-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ProposalSetType } from './proposals/proposal-data/proposal-sets';
import { ContextService } from './context/context.service';

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

  selectedProposalSetType: ProposalSetType = 'wam';

  constructor(public proposalService: ProposalService, public contextService: ContextService,
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

    this.proposalService.storeSelection();

    if (localStorage.getItem(this.proposalService.getLocalStorageSelectedVariantsKey())) {
      this.selectedProposalSetType = 'custom';
    }

    this.proposalSetSelectionChanged();

    this.route.params.subscribe(p => {
      const key = p['key'];
      if (key) {
        this.selectedProposalSetType = 'custom';
        this.proposalService.setFromKey(key);
      }
    });
  }

  proposalSetSelectionChanged() {
    this.proposalService.loadActiveProposalSet({ setType: this.selectedProposalSetType });
  }

  showResults() {
    this.dialog.open(ResultsDialogComponent, {
      autoFocus: false,
    });
  }

  filterChanged() {
    this.proposalsFilter$.next(this.projectsFilter);
  }

  clearFilter() {
    this.projectsFilter = '';
    this.filterChanged();
  }

  clearSelection() {
    if (confirm(this.translate.instant('Are you sure you want to erase your selection of measures?'))) {
      this.proposalService.clearSelection();
    }
  }
}
