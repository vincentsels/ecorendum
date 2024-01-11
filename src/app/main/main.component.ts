import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Proposal, ProposalSetType } from './proposal';
import { ProposalDetail } from './proposal-details';
import { ProposalService } from './proposal.service';
import { ResultsDialogComponent } from './results/results-dialog.component';
import { ActivatedRoute } from '@angular/router';

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

  selectedProposalType: ProposalSetType = 'nekp';
  proposalSet: ProposalDetail[] = [];
  proposalSetCommitted: ProposalDetail[] = [];
  proposalSetOther: ProposalDetail[] = [];

  constructor(public proposalService: ProposalService, private dialog: MatDialog, private translate: TranslateService,
    private route: ActivatedRoute) {
    this.filteredProposals$ = combineLatest([this.proposalsFilter$, this.proposalService.proposals$])
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

    this.proposalService.updateResults();

    if (localStorage.getItem(this.proposalService.getLocalStorageSelectedVariantsKey())) {
      this.selectedProposalType = 'own';
    }

    this.proposalSetSelectionChanged();

    this.route.params.subscribe(p => {
      const key = p['key'];
      if (key) {
        this.selectedProposalType = 'own';
        this.proposalService.setFromKey(key);
      }
    });
  }

  proposalSetSelectionChanged() {
    if (this.selectedProposalType !== 'own') {
      this.proposalService.clearSelection(false);
      this.proposalSet = this.proposalService.getSet(this.selectedProposalType);
      for (let proposal of this.proposalSet) {
        this.proposalService.selectVariant(proposal, proposal.variants[proposal.variants.length -1], false);
      }
      this.proposalSetCommitted = this.proposalSet.filter(p => p.committed);
      this.proposalSetOther = this.proposalSet.filter(p => !p.committed);
    } else {
      this.proposalSet = [];
      this.proposalService.clearSelection(false);
      this.proposalService.loadProposals();
    }
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
